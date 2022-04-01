import express from 'express';
import Contact from '../Models/contact';
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) 
{
  res.render('index', { title: 'Home', page: 'home', displayName: '' });
});

/* GET home page. */
router.get('/home', function(req, res, next) 
{
  res.render('index', { title: 'Home', page: 'home', displayName: '' });
});

/* GET about page. */
router.get('/about', function(req, res, next) 
{
  res.render('index', { title: 'About Us', page: 'about', displayName: '' });
});

/* GET projects page. */
router.get('/projects', function(req, res, next) 
{
  res.render('index', { title: 'Our Projects', page: 'projects', displayName: '' });
});

/* GET services page. */
router.get('/services', function(req, res, next) 
{
  res.render('index', { title: 'Our Services', page: 'services', displayName: '' });
});

/* GET contact page. */
router.get('/contact', function(req, res, next) 
{
  res.render('index', { title: 'Contact Us', page: 'contact', displayName: '' });
});

/* GET login page. */
router.get('/login', function(req, res, next) 
{
  res.render('index', { title: 'Login', page: 'login', displayName: '' });
});

/* GET register page. */
router.get('/register', function(req, res, next) 
{
  res.render('index', { title: 'Register', page: 'register', displayName: '' });
});

/* Temporary Routes - Contact-List Related */
/* GET contact-list page. */
router.get('/contact-list', function(req, res, next) 
{
  Contact.find(function(err, contactsCollection)
  {
    if(err)
    {
      console.error(err);
      res.end(err);
    }
    res.render('index', { title: 'Contact List', page: 'contact-list', contacts: contactsCollection, displayName: '' });
  });
});

/* Display the Add Page. */
router.get('/add', function(req, res, next) 
{
  res.render('index', { title: 'Add', page: 'edit', contact: '', displayName: '' });
});

/* Process the Add Request. */
router.post('/add', function(req, res, next) 
{
  // Create a new contact to add
  let newContact = new Contact({
    "FullName": req.body.fullName,
    "ContactNumber": req.body.contactNumber,
    "EmailAddress": req.body.emailAddress
  });

  // Insert the contact to the DB
  Contact.create(newContact, function(err: ErrorCallback)
  {
    if (err)
    {
      console.error(err);
      res.end(err);
    }

    // newContact has been added to the DB -> goto contact-list
    res.redirect('/contact-list');
  })
});

/* Display the Edit Page with Data injected from the DB. */
router.get('/edit/:id', function(req, res, next) 
{
  let id = req.params.id;

  // Pass the ID to the DB and read the contact in
  Contact.findById(id, {}, {}, function(err, contactToEdit)
  {
    if(err)
    {
      console.log(err);
      res.end(err);
    }
    // Show the edit view with the data
    res.render('index', { title: 'Edit', page: 'edit', contact: contactToEdit, displayName: '' });
  });
});

/* Process the Edit request */
router.post('/edit/:id', function(req, res, next) 
{
  let id = req.params.id;

  // Create a new contact to edit
  let updatedContact = new Contact({
    "_id": id,
    "FullName": req.body.fullName,
    "ContactNumber": req.body.contactNumber,
    "EmailAddress": req.body.emailAddress
  });

  // db.contacts.update
  Contact.updateOne({_id: id}, updatedContact, function(err: ErrorCallback)
  {
    if(err)
    {
      console.log(err);
      res.end(err);
    }
    // The edit worked 
    res.redirect('/contact-list');
  });
});

/* Process the Delete requese */
router.get('/delete/:id', function(req, res, next) 
{
  let id = req.params.id;

  // Pass the ID to the DB and delete the contact
  Contact.remove({_id: id}, function(err)
  {
    if(err)
    {
      console.log(err);
      res.end(err);
    }
    // The delete worked
    res.redirect('/contact-list');
  });
});

export default router;
