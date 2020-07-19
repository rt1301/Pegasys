Pegasys- website for an imaginary Space-Exploration Company. The website is made using NodeJs, MongoDB,Express and the 3D animations are made using blender.

## MongoDB Installation
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
## Windows installation

Download the MongoDB Community MSI installer from the following link

https://www.mongodb.com/download-center/community?tck=docs_server

- In the Version dropdown, select the version of MongoDB to download.
- In the OS dropdown, select Windows x64.
- In the Package dropdown, select MSI.
- Click Download.

### Run the MongoDB installer 
Follow the MongoDB Community Edition installation wizard

### Choose Setup Type
You can choose either the Complete (recommended for most users) or Custom setup type. The Complete setup option installs MongoDB and the MongoDB tools to the default location. The Custom setup option allows you to specify which executables are installed and where.

### Create database directory
Create the data directory where MongoDB stores data. MongoDB’s default data directory path is the absolute path \data\db on the drive from which you start MongoDB.

```text
cd C:\
md "\data\db"
```

```text
"C:\Program Files\MongoDB\Server\4.2\bin\mongod.exe" --dbpath="c:\data\db"
```

### Connect to MongoDB

```text
"C:\Program Files\MongoDB\Server\4.2\bin\mongo.exe"
```

[Additional windows support](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)


