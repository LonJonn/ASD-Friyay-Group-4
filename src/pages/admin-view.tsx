import {Box, Heading, List, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, } from "@chakra-ui/react"
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import { getSession } from "next-auth/client";


import { withAuthRequired } from "@app/lib/with-auth-required";
import { getAllUsers, GetAllUsersResponse } from "@app/services/user";
import $ from 'jquery';


type AllUsersProps = Required<InferGetServerSidePropsType<typeof getServerSideProps>>;

const AllUsers: NextPage<AllUsersProps> = ({ users }) => (
  //Place box element which contains admin front end HTML
  <Box>
  <a className="button" id="new-user-button" onClick={toggleNewUser}>Create new user</a>
    <Heading mb="4">Hello Admin!</Heading>
    <p>You are logged in as an admin.</p>
    <form id="seach-div">
    <p className="search-text">Search Users</p>
    <label><input type="text" name="name" id="admin-search-text"/></label>
    <input type="submit" value="Submit" id="admin-search" onClick={submitSearch}/>
    <img className="hide searchClosebtn" id="clearSearchBtn" onClick={clearSearch} src="https://cdn-icons-png.flaticon.com/512/1617/1617543.png"></img>
    </form>
    <div className="new-user-container hide">
      <Heading mb="4">Create New User</Heading>
      <form className="new-user-form">
      <p className="search-text">Name</p>
      <label><input type="text" name="name" className="admin-search-text" id="admin-search-name"/></label>
      <p className="search-text">Email Address</p>
      <label><input type="text" name="name" className="admin-search-text" id="admin-search-email"/></label>
      <input className="button" value="Create New User" id="admin-search" onClick={createNewUser}/>
      </form>
      <div>
        <div id="success-container" className="hide">
        <img className="newuser-gif" src="https://c.tenor.com/TrAsjYbL720AAAAC/chris-pratt-wow.gif" alt="Success!"/>
        <p>New User Created! Reloading the page now...</p>
        </div>
        <div id="failure-container" className="hide">
        <img className="newuser-gif" src="https://media.giphy.com/media/YTJXDIivNMPuNSMgc0/giphy.gif" alt="Success!"/>
        <p>There is an issue with the Name or Email Address. Please check again!</p>
        </div>
      </div>
    </div>
    {BasicUsage()}

    <ul className="all-users-list" id="allUsersList">
      {users.map((user) => (
        <li key={user.id} className="list-item-users" data-firstName={user.firstName} data-email={user.email}>
          {user.firstName} | {user.email}
          <button className="button button-outline table-button" onClick={deleteUserInit}>Delete User</button>
          <button className="button button-outline  table-button" onClick={editUser}>Edit User</button>
        </li>

      ))}
    </ul>
    <div id="search-NoUsers" className="hide">
      <img className="noUsers-img" src="https://cdn-icons-png.flaticon.com/512/2371/2371628.png"></img>
      <p className="noUsers-txt">No users matched this search result! Try again</p>
    </div>
  </Box>
);

//submit search
function submitSearch() {
  $("#seach-div").submit(function(e) {
      e.preventDefault();
  });
  var searchVal = $('#admin-search-text').val();
  $('#clearSearchBtn').removeClass('hide');
  $('#clearSearchBtn').show();
  const returnedUsers = getSearchedUsers(searchVal);

}

//retrieve searched users from API
export async function getSearchedUsers(searchVal: any) {
  const res = await fetch("/api/admin-view/searchUser", {
    method: 'POST',
    body: searchVal.toString(),
  })
  const data = await res.json()

  if (!data) {
    //No users in this search
    console.log('No users');
  } else {
    displaySearch(data, searchVal);
  }

  return {
    props: { data },
  }
}

//loop to display search results
function displaySearch(data: any, searchVal: any) {
  checkFirstName(data, searchVal);
  var newLength = Object.keys(data).length;
  var a = 0;

  var totalUsers = $('#allUsersList > li').length;
  while (a < totalUsers) {
    var i = 0;
    var domName = $('#allUsersList').children().eq(a).data('firstname');
    checkUser(a, i, newLength, data, domName);
    if (a == totalUsers - 1) {
      if($('#allUsersList').children(':visible').length == 0) {
         $('#search-NoUsers').removeClass('hide');
         $('#search-NoUsers').show();
      }
    }
    a++;
  }
}

// check if user is in returned search, if not it's excluded from view
function checkUser(a: number, i: number, newLength: number, data: any, domName: any) {
  var counter = 0;
  while (i <= newLength) {

    if (data[i]) {
      var searchFirstName = data[i].name.split(".")[0];
      var searchEmail = data[i].email;
      if (domName == searchFirstName) {
        //User is in the search
        counter++;
      }
    }
    if (i == newLength) {
      if (counter == 0) {
        $('#allUsersList').children().eq(a).hide();
      }
    }
    i++;
  }
}

//ensure displayed users contain search result in first name only
function checkFirstName (data: any[], searchVal: any) {
  var length = Object.keys(data).length;
  let i = 0;
  while (i < length) {
    //Check if name contains search only in the last name (only first not last)
    var name = data[i].name;
    var splitName = name.split(".");

    if (!splitName[0].includes(searchVal)) {
      //Remove these records from the JSON file
      delete data[i];
    }
    i++;
  }

}

//clear search
function clearSearch() {
  $('#clearSearchBtn').hide();
  $('#admin-search-text').val('');
  $('#search-NoUsers').hide();
  var totalUsers = $('#allUsersList > li').length;
  var a = 0;
  while (a < totalUsers) {
    var element = $('#allUsersList').children().eq(a).show();
    a++;
  }
}

//pop up for edit user
function BasicUsage() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <button onClick={onOpen} id="modal-button" className="hide">Open Modal</button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <p className="search-text">Name</p>
          <input type="text" name="name" className="admin-search-text" id="edit-input-name"/>
          <p className="search-text">Email Address</p>
          <label><input type="text" name="name" className="admin-search-text" id="edit-input-email"/></label>
          <p className="search-text hide" id="edit-user-error">There's an error! Please fix</p>
          <p id="email-data" className='hide'></p>
          </ModalBody>

          <ModalFooter>
            <button onClick={submitEditUser} id="modalSubmit">Submit</button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

//edit user and filling pop up with user's data
function editUser(e: { currentTarget: any; }) {
  $('#modal-button').click();
  var clickedButton = e.currentTarget;
  var collectFirstName = $(clickedButton).parent().data('firstname');
  var collectEmail = $(clickedButton).parent().data('email');
  setTimeout(function(){
    $('#edit-input-name').val(collectFirstName);
    $('#edit-input-email').val(collectEmail);
    $('#email-data').text(collectEmail);
}, 10);
}

//submit edit user
function submitEditUser () {
  var newName = $('#edit-input-name').val() as string;
  var newEmail = $('#edit-input-email').val() as string;
  var oldEmail = $('#email-data').text();

  if (/^[a-zA-Z]+$/.test(newName)) {
    if (validateEmail(newEmail)) {
      //Call API to submit new name and email for the user
      var dataArray = [newName, newEmail, oldEmail];

      const res = fetch("/api/admin-view/editUser", {
        method: 'POST',
        body: dataArray.toString(),

      });
      //Refresh page
      setTimeout(function(){
     window.location.reload();
  }, 3000);
    } else {
      $('#edit-user-error').removeClass('hide');
      $('#edit-user-error').show();
      setTimeout(function() {
        $('#edit-user-error').fadeOut();
    }, 5000);
    }

  } else {
    $('#edit-user-error').removeClass('hide');
    $('#edit-user-error').show();
    setTimeout(function() {
      $('#edit-user-error').fadeOut();
  }, 5000);
  }

}

//Fires when the the 'Create New User' button is pressed
function createNewUser() {
  var name = $("#admin-search-name").val() as string;
  var email = $("#admin-search-email").val() as string;
  //Check name is valid
  if (/^[a-zA-Z]+$/.test(name)) {
    //Call validateEmail function and check if the email is valid
    if (validateEmail(email)) {
      //Success!
      $('#success-container').show();
      $('#success-container').removeClass('hide');
      setTimeout(function() {
        $('#success-container').fadeOut();
    }, 5000);

    //Create new user in DB
    //Send the API Request and pass the name and email to the API
    var dataArray = [name, email];

    const res = fetch("/api/admin-view/createUser", {
      method: 'POST',
      body: dataArray.toString(),

    });
    //Refresh page
    setTimeout(function(){
   window.location.reload();
}, 3000);

    } else {
      //Failure!
      $('#failure-container').show();
      $('#failure-container').removeClass('hide');

      setTimeout(function() {
        $('#failure-container').fadeOut();
    }, 5000);
    }
  } else {
    //Failure!
    $('#failure-container').show();
    $('#failure-container').removeClass('hide');

    setTimeout(function() {
      $('#failure-container').fadeOut();
  }, 5000);
  }
}

//Fires when the 'Delete User Button' is pressed for the specific user
function deleteUserInit(e: { currentTarget: any; }) {
  var el = e.currentTarget;
  var collectFirstName = $(el).parent().data('firstname');
  var collectEmail = $(el).parent().data('email');
  if(window.confirm("Are you sure you want to delete this user? " + collectEmail)) {
    //Send the API request and pass the email to the API
    const res = fetch("/api/admin-view/deleteUser", {
      method: 'POST',
      body: collectEmail,
    });
    //Refresh page
    setTimeout(function(){
   window.location.reload();
}, 3000);
  }
}

//UX Logic to show/hide the 'Create New User' form
function toggleNewUser() {
  $( ".new-user-container" ).toggleClass('hide');
}
//Function that checks the email is a valid format and returns a boolean response.
function validateEmail(email:string) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

//Logic to run the GetAllUsers API
export const getServerSideProps: GetServerSideProps<{ users?: GetAllUsersResponse }> = async (
  ctx
) => {
  // Check if user is logged in, if not, return out
  const session = await getSession(ctx) as any;

  if (!session) {
    return {
      props: {},
      // redirect: {
      //   destination: "/login",
      //   permanent: false,
      // },
    };
  } else {
    //Check if user is an admin. If not, redirect them to a 404 page.
    if (session.user.email = 'admin@gmail.com' || 'anastasia.grivas@student.uts.edu.au') {
      //User is an admin
      console.log('admin');

    } else {
      //User is not an admin
      console.log('no admin');
      return {
        props: {},
         redirect: {
           destination: "/admin-error",
           permanent: false,
         },
      };
    }
  }

  const users = await getAllUsers();

  return {
    props: {
      session, // We return the session here so that the client doesn't have to request it again
      users,
    },
  };
};

export default withAuthRequired(AllUsers);
