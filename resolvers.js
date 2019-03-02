const user = {
  _id: '1',
  name: 'Vitor',
  email: 'vitorboccio@gmail.com',
  picture: 'https://cloudinary.com/asdasda',
}

module.exports = {
  Query: {
    me: () => user
  }
}