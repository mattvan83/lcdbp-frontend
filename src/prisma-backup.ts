model contacts {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  v         Int      @map("__v") @default(0)
  createdAt DateTime @db.Date @default(now())
  email     String
  firstname String
  lastname  String
  message   String
  ownCopy   Boolean
  phone     String?
  updatedAt DateTime @db.Date @updatedAt
}

model events {
  id                   String   @id @default(auto()) @map("_id") @db.ObjectId
  v                    Int      @map("__v") @default(0)
  chores               String[]
  city                 String
  createdAt            DateTime @db.Date @default(now())
  eventDate            DateTime @db.Date
  place                String
  postalCode           String
  price                String
  thumbnailDescription String
  thumbnailUrl         String
  title                String
  updatedAt            DateTime @db.Date @updatedAt
}

model listenings {
  id                   String   @id @default(auto()) @map("_id") @db.ObjectId
  v                    Int      @map("__v") @default(0)
  arrangement          String?
  harmonization        String?
  artwork              String?
  audioUrl             String
  authorMusic          String
  authorText           String?
  createdAt            DateTime @db.Date @default(now())
  lastListening        Boolean
  recordingDate        DateTime @db.Date
  thumbnailDescription String
  thumbnailUrl         String
  title                String
  updatedAt            DateTime @db.Date @updatedAt
}

model pressreviews {
  id                   String   @id @default(auto()) @map("_id") @db.ObjectId
  v                    Int      @map("__v") @default(0)
  city                 String
  createdAt            DateTime @db.Date @default(now())
  journal              String
  lastPressReview      Boolean
  pressReviewDate      DateTime @db.Date
  thumbnailDescription String
  thumbnailUrl         String
  title                String
  updatedAt            DateTime @db.Date @updatedAt
}

model studiedworks {
  id                    String                     @id @default(auto()) @map("_id") @db.ObjectId
  v                     Int                        @map("__v") @default(0)
  artwork               String?
  authorMusic           String?
  code                  String
  createdAt             DateTime                   @db.Date @default(now())
  isAtWork              Boolean
  partitionThumbnailUrl String
  partitionUrl          String
  title                 String
  updatedAt             DateTime                   @db.Date @updatedAt
  workRecordings        Json?
}

enum Voice {
  B1
  B2
  T1
  T2
}

enum Type {
  admin
  user
}

model users {
  id           String   @id @default(auto()) @map("_id") @db.ObjectId
  v            Int      @map("__v") @default(0)
  address      String
  birthDate    DateTime @db.Date
  city         String
  createdAt    DateTime @db.Date @default(now())
  email        String   @unique
  firstname    String
  incomingDate DateTime @db.Date
  lastname     String
  mobile       String?
  password     String?
  phone        String?
  postalCode   String
  token        String?
  type         Type     @default(user)
  updatedAt    DateTime @db.Date @updatedAt
  username     String?
  voice        Voice
}