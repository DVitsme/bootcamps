class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = ErrorResponse;

PORT=8000
NODE_ENV='development'
MONGO_URI=mongodb+srv://Nero:<password>@cluster0.gevow.mongodb.net/test?retryWrites=true&w=majority

GEOCODER_API_KEY=9FeYYw5WTMOEODfYy7D44cLatjrnzGYd
GEOCODER_PROVIDER=mapquest