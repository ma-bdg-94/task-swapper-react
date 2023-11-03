const { connect } = require('mongoose')


const connectDB = async () => {
  try {
    await connect(process.env.DB_URI)
    console.info('Connected to Database!')
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

module.exports = connectDB