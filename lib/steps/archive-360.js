const { promisify } = require('util')
const archive360 = promisify(require('p360'))
const logger = require('../logger')
const { p360 } = require('../../config')

module.exports = async data => {
  const contact = data.svarSendesTil
  const meta = {
    p360,
    clientService: 'DocumentService',
    clientMethod: 'CreateDocument',
    args: {
      parameter: {
        AccessCode: '13',
        AccessGroup: 'TFK-robot',
        Category: 'Dokument inn',
        DocumentDate: new Date(data.date).toISOString(),
        Files: [
          {
            CreateFileParameter: {
              Base64Data: data.file,
              Category: '1',
              Format: 'pdf',
              Status: 'F',
              Title: data.fileName,
              VersionFormat: 'A'
            }
          }
        ],
        JournalDate: new Date(data.date).toISOString(),
        Paragraph: 'Offl §13 jfr Fvl §13.1',
        ResponsibleEnterpriseRecno: '506',
        ResponsiblePersonRecno: '200333',
        Status: 'J',
        Title: data.tittel,
        UnofficialTitle: `${data.tittel} - ${contact.navn}`,
        UnregisteredContacts: [
          {
            UnregisteredContactParameter: [
              {
                Address: contact.adresse1,
                ContactName: contact.navn,
                ReferenceNumber: contact.fnr,
                Role: 'Avsender',
                ZipCode: contact.postnr,
                ZipPlace: contact.poststed
              }
            ]
          }
        ],
        Archive: 'Saksdokument', // Codetable: Document archive
        CaseNumber: data.caseNumber
      }
    }
  }

  // console.log(JSON.stringify(meta, null, 2))
  try {
    logger('info', ['archive-360', 'looking up case'])
    const { CreateDocumentResult } = await archive360(meta)
    if (!CreateDocumentResult.Successful) throw new Error(CreateDocumentResult)
    logger('info', ['archive-360', `case found: ${CreateDocumentResult.DocumentNumber}`])
    data.documentNumber = CreateDocumentResult.DocumentNumber
    return data
  } catch (error) {
    throw error
  }
}
