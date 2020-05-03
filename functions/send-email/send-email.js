const SparkPost = require('sparkpost');
const client = new SparkPost(process.env.SPARKPOST);

exports.handler = async (event, context) => {
  const name = event.queryStringParameters.name || 'No Name'
  const email = event.queryStringParameters.email || 'No email'
  const phone = event.queryStringParameters.phone || 'No phone'
  const message = event.queryStringParameters.message || 'No Message'

  let htmlBody = '';
  [['name',name],['email',email],['phone',phone],['message',message]].forEach((e) => {
    htmlBody += '<p>' + e[0] + ': ' + e[1] + '</p><br>'
  });

  try {
    await client.transmissions.send({
      content: {
          from: 'contact@email.pciflooringcanada.com',
          subject: 'Contact from pciflooringcanada',
          html:
            '<html><body>' + htmlBody + '</body></html>'
        },
        recipients: [ { address: 'pciflooringcontractor@gmail.com' }, { address: 'garfiaslopez@hotmail.com' }]
    });
  } catch(err) {
    return { statusCode: 500, body: err.toString() }
  }
  return {
    statusCode: 200,
    body: JSON.stringify({ success: true })
  }
}
