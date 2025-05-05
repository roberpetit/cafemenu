import * as admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';

// Initialize Firebase Admin
admin.initializeApp();

// Reference to Firestore
const db = admin.firestore();

// Path to the menu-data.json file
const filePath = path.join(__dirname, 'menu-data.json');

// Read the JSON data from the file
const rawData = fs.readFileSync(filePath, 'utf8');
const menuData = JSON.parse(rawData);

// Firestore collection reference
const menuCollection = db.collection('menu');

// Function to populate Firestore with the menu data
const populateFirestore = async () => {
  try {
    // Loop through each item in the menu and add to Firestore
    for (const category of menuData) {
      const categoryDoc = menuCollection.doc(category.title); // Each category as a document
      const items = category.items; // The list of items in the category

      // Add items as a subcollection under each category
      const itemsCollection = categoryDoc.collection('items');
      for (const item of items) {
        await itemsCollection.add({
          title: item.title,
          description: item.description,
          price: item.price
        });
      }
    }

    console.log('Menu successfully populated in Firestore!');
  } catch (error) {
    console.error('Error populating Firestore:', error);
  }
};

// Execute the function to populate Firestore
populateFirestore();
