# Dklontong

## Setting up the Server

Once you've cloned the repository, follow these steps:

1. Navigate to the server directory:

```bash
cd server
npm install
```

2. Database Configuration:

- If you'd like to use your own database, update the database name in the .env file to your MongoDB URI and also in every seeders.

- If you prefer to use the provided database, simply leave the URI unchanged

### In .env

```text
MONGO_URI = "mongodb+srv://example/<DATABASENAME>?retryWrites";
```

### In Seeders

```text

mongoose.connect(
  "<YOUR_MONGO_URI>",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
```

Within the server directory, execute the seeders:

```bash
cd seeders
node seed-all-categories.js
node seed-all-products.js
node seed-all-users.js
```

Start the server:

```bash
npm start
```

That's it! Your server should now be running smoothly.

### This is default ENV

```env
JWT_SECRET="rahasia"
MONGO_URI="mongodb+srv://rifandye:0rdfDh995JIgsGra@cluster0.mblecp5.mongodb.net/DKlontong_DB?retryWrites=true&w=majority&appName=Cluster"
CLOUDINARY_CLOUD_NAME=dpsupok6p
CLOUDINARY_API_KEY=991922798942747
CLOUDINARY_API_SECRET=c7GXbrZ-LwiINhY5z1HxeGJoDuY
```

## Setting Up the Client

1. Navigate to the DKlontong-Client directory:

```bash
cd DKlongtong-Client
npm install
```

2. To Start the Client:

```bash
npm run dev
```

## User Account Testing

```text
email: brikteam@example.com
password: 123456789

```
