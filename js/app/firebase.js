var myDataRef = new Firebase("https://bokdem-firebase.firebaseio.com/");

$('.save-name').click(function() {
  var styles = {
    "left" : "0",
    "top": "20px",
    "width": "240px",
    "margin-left": "20px"
  };
  $('#nameInput').attr('readonly', true);
  $('.name-input').css( styles );
});

$("#messageInput").keypress(function(e) {
  if(e.keyCode == 13) {
    var name = $("#nameInput").val();
    var text = $("#messageInput").val();
    myDataRef.push({ name: name, text: text });
    $("#messageInput").val('');
  }
});

myDataRef.on('child_added', function(snapshot) {
  var message = snapshot.val();
  displayChatMessage(message.name, message.text);
});

function displayChatMessage(name, text) {
  $('<li class="message-wrapper"/>').append($('<p class="message" />').text(text)).prepend($('<p class="messenger-name"/>').text(name+': ')).appendTo($('#messagesDiv'));
  $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
};

$('.clear').click(function() {
  myDataRef.remove();
  $('#messagesDiv').html('');
});