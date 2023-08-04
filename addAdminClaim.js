const admin = require('./admin');

async function addAdminClaim(email) {
try {
    const user = await admin.auth().getUserByEmail(email);
    if (user) {
    const customClaims = {
        admin: true
    };

    await admin.auth().setCustomUserClaims(user.uid, customClaims);
    console.log(`User ${email} has been granted admin privileges.`);
    } else {
    console.log(`User ${email} not found.`);
    }
} catch (error) {
    console.error('Error adding admin claim:', error);
}
}

// Usage: node addAdminClaim.js <user-email>
const userEmail = process.argv[2];
if (userEmail) {
addAdminClaim(userEmail);
} else {
console.log('Please provide the user email as an argument.');
}
