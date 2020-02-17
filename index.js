const { google } = require('googleapis');
const getAuth = require('./authenticate');

const auth = getAuth();

messages = listMessages(auth);

console.log(messages);

/**
 * Lists the labels in the user's account.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function listMessages(auth) {
  const gmail = google.gmail({ version: 'v1', auth });
  try {
    const messages = await gmail.users.messages.list({
      userId: 'me'
    });
    console.log(messages);
  } catch (error) {
    console.log(error);
  }
}

function listLabels(auth) {
  const gmail = google.gmail({ version: 'v1', auth });
  gmail.users.messages.list(
    {
      userId: 'me'
    },
    (err, res) => {
      if (err) return console.log('The API returned an error: ' + err);
      const messages = res.data.messages;
      if (messages.length) {
        console.log('Labels:');
        messages.forEach(message => {
          console.log(`- ${message.name}`);
        });
      } else {
        console.log('No labels found.');
      }
    }
  );
  gmail.users.labels.list(
    {
      userId: 'me'
    },
    (err, res) => {
      if (err) return console.log('The API returned an error: ' + err);
      const labels = res.data.labels;
      if (labels.length) {
        console.log('Labels:');
        labels.forEach(label => {
          console.log(`- ${label.name}`);
        });
      } else {
        console.log('No labels found.');
      }
    }
  );
}
