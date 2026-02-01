/**
 * Converts a Mongoose document to a plain object and renames _id to id.
 * @param {Object} doc - The Mongoose document
 * @returns {Object} - The plain JavaScript object
 */
function userDetailsOnTemplate(doc) {
    const user = doc.toObject();
    user.id = user._id.toString();
    delete user._id;
    return user;
}

module.exports = { userDetailsOnTemplate };
