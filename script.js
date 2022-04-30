// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALrJMA1Y06FWfanVjKvhcrLXclcpVV1kg",
  authDomain: "ecommerce-aca90.firebaseapp.com",
  projectId: "ecommerce-aca90",
  storageBucket: "ecommerce-aca90.appspot.com",
  messagingSenderId: "325904513614",
  appId: "1:325904513614:web:64c68ef2d9a802f41e611f"
};

// Initialize Firebase
firebase.initializeApp( firebaseConfig );
firebase.analytics( );

function getContactInformation( ) {
    firebase.database( ).ref
}

function contactMsg(name,mail,message){
    firebase.database()
    .ref("user-contact/")
    .push({
        name:name,
        mail:mail,
        message:message
    }).catch((error)=>{
        err = error;
    })
}

function sendMessage() {
     let name = document.getElementById("name").value;
     let mail = document.getElementById("mail").value;
     let message = document.getElementById("message").value;
     console.log(name,mail,message);
     if ( name == '' || mail == '' || message == '' ) {
        Swal.fire( {
            icon: 'error',
            title: 'Oops...',
            text: 'Please Fullfill Text Field!',
        } )
        return;
    }
    document.getElementById( "name" ).value = "";
    document.getElementById( "mail" ).value = "";
    document.getElementById( "message" ).value = "";
    Swal.fire(
        'Good job!',
        'Your Message Send Successfully!',
        'success'
    )
    contactMsg(name,mail,message)
}


function registration(){
    let Rname = document.getElementById("rname").value;
    let Rnumber = document.getElementById("rnumber").value;
    let Rmail = document.getElementById("remail").value;
    let Rpass = document.getElementById("rpassword").value;
    // console.log(Rname,Rmail,Rnumber,Rpass);
    if ( Rname == '' || Rnumber == '' || Rmail == '' || Rpass == '') {
        Swal.fire( {
            icon: 'error',
            title: 'Oops...',
            text: 'Please Fullfill Text Field!',
        } )
        return;
    }

    firebase.auth( ).createUserWithEmailAndPassword( Rmail, Rpass )
    .then( ( userCredential ) => {
        // Signed in 
        var user = userCredential.user;
        console.log( user );
        firebase.database( )
            .ref( "User/" + user.uid )
            .set( {
                Rname:Rname,
                Rnumber:Rnumber,
                Rmail:Rmail,
                Rpass:Rpass
            } ).catch( ( error ) => {
                err = error;
            } )
            // ...
    } )
    .catch( ( error ) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log( errorMessage )
            // ..
    } );
    document.getElementById("rname").value="";
    document.getElementById("rnumber").value="";
    document.getElementById("remail").value="";
    document.getElementById("rpassword").value="";
    Swal.fire(
        'Good job!',
        'Your has been created Successfully!',
        'success'
    )

}




function signAccount(){
    let smail = document.getElementById("semail").value;
    let spass = document.getElementById("spassword").value;
    // console.log(smail,spass);
    if(smail == '' || spass == ''){
        Swal.fire( {
            icon: 'error',
            title: 'Oops...',
            text: 'Please Fullfill Text Field!',
        } )
        return;
    }


    firebase.auth( ).signInWithEmailAndPassword( smail, spass )
    .then( ( userCredential ) => {
        // Signed in
        var user = userCredential.user;
        console.log( user );
        // alert("yor have been  signin...");
        // location.href = "./quiz.html";

        const dbRef = firebase.database( ).ref( '/User' );
        dbRef.child( user.uid ).get( ).then( ( snapshot ) => {
            if ( snapshot.exists( ) ) {
                console.log( snapshot.val( ) );
            } else {
                console.log( "No data available" );
            }
        } ).catch( ( error ) => {
            console.error( error );

        } );

    } )
    .catch( ( error ) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log( errorMessage )
        // console.log("something going on wrong....2");
        Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please Fullfill Text Field!',
    })

    } );
    alert("login successfully")
    document.getElementById( "semail" ).value="";
    document.getElementById( "spassword" ).value="";

}