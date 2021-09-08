import { Box, Heading, List } from "@chakra-ui/react";
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import { getSession } from "next-auth/client";


import { withAuthRequired } from "@app/lib/with-auth-required";
import { getAllUsers, GetAllUsersResponse } from "@app/services/user";
import $ from 'jquery';


type AllUsersProps = Required<InferGetServerSidePropsType<typeof getServerSideProps>>;

const AllUsers: NextPage<AllUsersProps> = ({ users }) => (
  //Place box element which contains admin front end HTML
  <Box>
  <a class="button" id="new-user-button" onClick={toggleNewUser}>Create new user</a>
    <Heading mb="4">Hello Admin!</Heading>
    <p>You are logged in as an admin.</p>
    <form id="seach-div">
    <p class="search-text">Search Users</p>
    <label><input type="text" name="name" id="admin-search-text"/></label>
    <input type="submit" value="Submit" id="admin-search"/>
    </form>
    <div class="new-user-container hide">
      <Heading mb="4">Create New User</Heading>
      <form class="new-user-form">
      <p class="search-text">Name</p>
      <label><input type="text" name="name" class="admin-search-text" id="admin-search-name"/></label>
      <p class="search-text">Email Address</p>
      <label><input type="text" name="name" class="admin-search-text" id="admin-search-email"/></label>
      <input class="button" value="Create New User" id="admin-search" onClick={createNewUser}/>
      </form>
      <div>
        <div id="success-container" class="hide">
        <img class="newuser-gif" src="https://c.tenor.com/TrAsjYbL720AAAAC/chris-pratt-wow.gif" alt="Success!"/>
        <p>New User Created! Reloading the page now...</p>
        </div>
        <div id="failure-container" class="hide">
        <img class="newuser-gif" src="https://media.giphy.com/media/YTJXDIivNMPuNSMgc0/giphy.gif" alt="Success!"/>
        <p>There's an issue with the Name or Email Address. Please check again!</p>
        </div>
      </div>
    </div>
    <ul class="all-users-list">
      {users.map((user) => (
        <li key={user.id} class="list-item-users" data-firstName={user.firstName} data-email={user.email}>
          {user.firstName} | {user.email}
          <button class="button button-outline table-button" onClick={deleteUserInit}>Delete User</button>
          <button class="button button-outline  table-button">Edit User</button>
        </li>

      ))}
    </ul>

    <Heading mb="4" id="nil-login" class="hide">You are not logged in as an admin</Heading>

  </Box>
);

//Fires when the the 'Create New User' button is pressed
function createNewUser() {
  var name = $("#admin-search-name").val();
  var email = $("#admin-search-email").val();
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
      body: dataArray,

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
function deleteUserInit(e) {
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
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

//Logic to run the GetAllUsers API
export const getServerSideProps: GetServerSideProps<{ users?: GetAllUsersResponse }> = async (
  ctx
) => {
  // Check if user is logged in, if not, return out
  const session = await getSession(ctx);
  if (!session) {
    return {
      props: {},
      // redirect: {
      //   destination: "/login",
      //   permanent: false,
      // },
    };
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
