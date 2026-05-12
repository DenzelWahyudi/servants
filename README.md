# Backend Programming UTS (2026)

### Daffa Prawira - 535220199

### Vaibhav - 535250002

### Nickson Kiyoshi - 525250007

### Denzel Mark Wahyudi - 535250015

### Catherine Zefanya Lorens Lukyto - 535250024

---

## Development Setup

1. Fork and clone this repository to your local computer.
2. Open the project using VS Code.
3. Install the recommended VS Code extensions: `ESLint` and `Prettier`.
4. Copy and rename `.env.example` to `.env`.
5. Open `.env` and set the variable `DB_CONNECTION` to the database connection string, `SECRET_KEY` to your encription key, `RANDOM_KEY` to any value.
6. Run `npm install` to install the project dependencies.
7. Run `npm run dev` to start the dev server.

## Endpoints Documentation

### Authentication Components

Endpoints:

1. POST `localhost:<portNum>/api/auth/register`. Membuat sign-in baru untuk user dengan form dan menyimpannya ke database.

Body:

```json
{
  "email": "yourEmailAddress",
  "password": "yourPassword",
  "confirm_password": "yourPassword",
  "full_name": "yourName",
  "role": "user or admin"
}
```

Additional Notes:

- A user has the role value set to `user` by default.
- A role can only have the value `user` or `admin`.
- Password must have `length > 8`.

Example Result:
![Example of User Register](https://github.com/EndlessWay1/images/blob/main/ExampleofUserRegister.png?raw=true)

2. POST `localhost:<portNum>/api/auth/login`. Membuat login `token` untuk user agar dapat masuk dengan form, dan konfirmasi password dan username ke database. Token ini hanya akan valid selama 15 menit karena security.

Body:

```json
{
  "email": "yourEmailAddress",
  "password": "yourPassword"
}
```

Result:

```json
{
  "email": "yourEmailAddress",
  "role": "user",
  "token": "yourLoginToken"
}
```

Additional Notes:

- To access this endpoint, you must first register to have a user.
- To use this token, on header use `Authentication` with the value `JWT yourLoginToken`

Example Result:
![Example of User Login](https://github.com/EndlessWay1/images/blob/main/ExampleofUserLogin.png?raw=true)

2. POST `localhost:<portNum>/api/auth/transaction`. Membuat transaction token untuk `user` agar dapat melakukan transaksi dengan token login, account `pin` dan `accountType`. Token ini hanya akan valid selama 15 menit karena security.

Body:

```json
{
  "pin": "yourAccountPin",
  "accountType": "yourAccountType"
}
```

Header:

![Header image](https://github.com/EndlessWay1/images/blob/main/Data%20Header%20Transaction%20Token.png?raw=true)

Result:

```json
{
  "token": "yourTransactionToken"
}
```

Aditional Notes:

- Endpoint ini menggunakan login token yang dapat diakses di POST `/api/auth/login` dan menaruhnya di header.
- Endpoint ini menggunakan Account yang telah dibuat sebelumnya pada POST `/api/accounts`.

Example Result:

![Example of Account Transaction Token](https://github.com/EndlessWay1/images/blob/main/Data%20Body%20Transaction%20Token%20Example.png?raw=true)

### Users Components

Endpoints:

1. GET `localhost:<portNum>/api/users`. Memberikan informasi Users dengan Token dari login.

Header:

![Header image](https://github.com/EndlessWay1/images/blob/main/Data%20Header%20Transaction%20Token.png?raw=true)

Aditional Notes:

- Endpoint ini menggunakan login token yang dapat diakses di POST `/api/auth/login` dan menaruhnya di header.

2. PUT `localhost:<portNum>/api/users`. Mengupdate `full_name` atau `email`.

Body:

```json
{
  "email": "yourNewEmail",
  "full_name": "yourNewName"
}
```

Header:

![Header image](https://github.com/EndlessWay1/images/blob/main/Data%20Header%20Transaction%20Token.png?raw=true)

Aditional Notes:

- Endpoint ini menggunakan login token yang dapat diakses di POST `/api/auth/login` dan menaruhnya di header.
- `Email` disini harus belum pernah terdaftar di database.

3. PUT `localhost:<portNum>/api/users/change-password`. Mengubah password `User` yang dibuat.

Body:

```json
{
  "old_password": "yourOldPassword",
  "new_password": "yourNewPassword",
  "confirm_new_password": "yourNewPassword"
}
```

Header:

![Header image](https://github.com/EndlessWay1/images/blob/main/Data%20Header%20Transaction%20Token.png?raw=true)

Aditional Notes:

- Endpoint ini menggunakan login token yang dapat diakses di POST `/api/auth/login` dan menaruhnya di header.
- `old_password` dengan `new_password` tidak boleh sama.
- `confirm_new_password` harus sama dengan `new_password`.

4. DELETE `localhost:<portNum>/api/users`. Mendelete `user` yang ada di database.

Header:

![Header image](https://github.com/EndlessWay1/images/blob/main/Data%20Header%20Transaction%20Token.png?raw=true)

Aditional Notes:

- Endpoint ini menggunakan login token yang dapat diakses di POST `/api/auth/login` dan menaruhnya di header.

### Transaction Components

1. POST `/api/transactions/transfer`. Melakukan transfer dengan cara menginput nomor rekening tujuan, nominalnya dan deskripsinya (opsional)

Body:
``` json
{
  "recipientAccountNumber": "existingAccountNumber",
  "amount": yourAmount,
  "description": "yourDescription"
}
```

Result:
``` json
{
  "status": "success",
  "message": "Transfer successful"
}
```


Additional Notes:

- To access this endpoint, you must first get a transaction token via POST `/api/auth/transaction`.
- On header use Authorization with the value: `yourTransactionToken`.
- `recipientAccountNumber` must be an existing account number.
- amount must be greater than zero and cannot exceed your current balance.
- You cannot transfer to your own account.

2. GET `/api/transactions/history`. Melihat daftar transaksi yang telah dilakukan sejauh ini.

Result:
``` json
{
  "status": "success",
  "message": "Transaction history retrieved",
  "data": [
    {
      "_id": "yourId",
      "fromAccount": "senderAccountNumber",
      "toAccount": "recipientAccountNumber",
      "type": "transfer",
      "amount": yourAmount,
      "description": "yourDescription",
      "status": "success",
      "processedAt": null,
      "createdAt": "transactionTimeStamp",
      "updatedAt": "transactionTimeStamp",
      "__v": 0
    }
  ]
}
```

Additional Notes:

- To access this endpoint, you must first obtain a transaction token via POST `/api/auth/transaction`.
- On header use Authorization with the value: `yourTransactionToken`.

### Cardless Components

1. POST `localhost:<portNum>/api/cardless/deposit`. Menambahkan saldo melalui deposit, menyimpannya dalam rekening pilihan pengguna, serta mencatatnya dalam transaction history.

Body:

```json
{
		"amount": deposit amount
}
```

Header:

![Header image](https://github.com/user-attachments/assets/d8d52a51-1012-4b48-9f67-a2d36bcd4465)

Result:

```json
{
  "message": "Successful deposit"
}
```

Additional Notes:

- Untuk mengakses endpoint ini, anda harus terlebih dahulu memiliki account.
- Amount harus diisi dan bersifat positif.
- Token `Authorization` didapatkan melalui /api/auth/transaction.

Example Result:
![Example of Deposit](https://github.com/user-attachments/assets/5975b333-ccfd-4f54-8d92-4d9b35738d35)

2. POST `localhost:<portNum>/api/cardless/withdraw`. Mengurangi saldo dari rekening pilihan pengguna melalui withdraw dan mencatatnya dalam transaction history.

Body:

```json
{
		"amount": withdraw amount
}
```

Header:

![Header image](https://github.com/user-attachments/assets/0eeb28f0-913c-401b-86e2-a56d7ae4a839)

Result:

```json
{
  "message": "Successful withdrawal"
}
```

Additional Notes:

- Untuk mengakses endpoint ini, anda harus terlebih dahulu memiliki account.
- Amount harus diisi, bersifat positif, dan tidak melebihi jumlah saldo dalam rekening.
- Token `Authorization` didapatkan melalui /api/auth/transaction.

Example Result:
![Example of Withdraw](https://github.com/user-attachments/assets/dbdd9717-a052-4309-969f-3cd695c35fe0)


### Beneficiaries Components

1. POST `localhost:<portNum>/api/beneficiaries`
Notes: user hanya bisa menambahkan beneficiaries berdasarkan transaksi yang sudah pernah dilakukan sebelumnya

```json
Body:
{
  "ownerAccountId": "accountId",
  "recipientAccountNumber": "recipientId",
  "recipientName": "name",
  "bankName": "bankName",
  "alias": "alias"
}

Result:
{
  message: "Beneficiary added successfully",
  data: newBeneficiary
}
```
2. GET `localhost:<portNum>/api/beneficiaries`

``` json
Body: 
{
  "userId": "",
  "accountType": "saving", "invesment"
}

Result:
{
  message: "List of Beneficiary",
  data
}
```

### Admin Components

1. GET `localhost:<portNum>/api/admin/users`
Notes: user harus memiliki role sebagai admin dan bukan user untuk mengakses endpoint ini, dan menggunakan token login

2. GET `localhost:<portNum>/api/admin/transactions`
Notes: user harus memiliki role sebagai admin dan bukan user untuk mengakses endpoint ini, dan menggunakan token login

### Accounts Components
1. POST `localhost:<portNum>/api/accounts`. Membuat account baru untuk user yang sudah terdaftar. Satu user dapat memiliki lebih dari satu account. Saat account dibuat, user harus mengisi PIN transaksi dan konfirmasi PIN.

```json
Body:
{
  "userId": "yourUserId",
  "accountNumber": "optionalCustomAccountNumber",
  "balance": 0,
  "accountType": "savings",
  "status": "active",
  "pin": "123456",
  "confirmPin": "123456"
}

Result:
{
  "status": "success",
  "message": "Account created successfully",
  "data": {
    "_id": "yourAccountId",
    "userId": "yourUserId",
    "accountNumber": "yourGeneratedAccountNumber",
    "balance": 0,
    "accountType": "savings",
    "status": "active",
    "pin": "hashedPin",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
}
```

Additional Notes:

- Nilai yang tidak dikirimkan melalui payload, akan diisi secara automatis oleh sistem dengan default value untuk field seperti userId, balance, accountType, status.
- Untuk mengakses endpoint ini, anda harus menggunakan authorization token dari auth.

2. GET `localhost:<portNum>/api/accounts`. Menampilkan seluruh account yang terdaftar di database.

```json
Result:
{
  "status": "success",
  "message": "Accounts retrieved successfully",
  "data": [
    {
      "_id": "yourAccountId",
      "userId": "yourUserId",
      "accountNumber": "yourAccountNumber",
      "balance": 100000,
      "accountType": "savings",
      "status": "active",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    },
    ...
  ]
}
```

Additional Notes:

- Untuk mengakses endpoint ini, anda harus menggunakan authorization token dari auth.

3. GET `localhost:<portNum>/api/accounts/:id/balance`. Menampilkan saldo dari account berdasarkan accountId.

```json
Result:
{
  "status": "success",
  "message": "Balance retrieved successfully",
  "data": {
    "balance": 100000
  }
}
```

Additional Notes:

- Untuk mengakses endpoint ini, anda harus menggunakan authorization token dari auth.
