const SparkPost = require('sparkpost');
const client = new SparkPost(process.env.SPARKPOST);
const querystring = require('querystring');

exports.handler = async (event, context) => {

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }
  const params = querystring.parse(event.body);

  const name = params.name || 'No Name'
  const email = params.email || 'No email'
  const phone = params.phone || 'No phone'
  const message = params.message || 'No Message'

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
