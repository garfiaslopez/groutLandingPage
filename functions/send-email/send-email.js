const SparkPost = require('sparkpost');
const client = new SparkPost(process.env.SPARKPOST);

exports.handler = async (event, context) => {
  const name = event.body.name || 'No Name'
  const email = event.body.email || 'No email'
  const phone = event.body.phone || 'No phone'
  const message = event.body.message || 'No Message'

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
        recipients: [ { address: 'garfiaslopez@hotmail.com' }] //{ address: 'pciflooringcontractor@gmail.com' },
    });
  } catch(err) {
    return { statusCode: 500, body: err.toString() }
  }
  return {
    statusCode: 200,
    body: JSON.stringify({ success: true })
  }
}
