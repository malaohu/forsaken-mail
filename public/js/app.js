/**
 * Created by Hongcai Deng on 2015/12/29.
 */

$(function(){
  $('.ui.modal')
    .modal()
  ;
 
  Push.Permission.request();

  var clipboard = new Clipboard('.copyable');

  $customShortId = $('#customShortid');
  $shortId = $('#shortid');
  $customTheme = 'check';
  $placeholder_old = '请等待分配临时邮箱';
  $placeholder_new = '请输入不带后缀邮箱账号';
  $customShortId.on('click',function() {
    var self = $(this);
    var editEnable = true;
    $shortId.prop('disabled', false);
    if(self.hasClass('edit')) {
      $shortId.val('');
      self.removeClass('edit');
      self.toggleClass($customTheme);
      $shortId.prop('placeholder', $placeholder_new);
    } else {
      $shortId.prop('disabled', true);
      self.removeClass('check');
      self.toggleClass('edit');
      $shortId.prop('placeholder',$placeholder_old);
      $mailUser = $shortId.val();
      var mailaddress = $mailUser + '@' + location.hostname;
      setMailAddress($mailUser);
      $shortId.val(mailaddress);
      window.location.reload();
    }
  });
  
  
  $maillist = $('#maillist');

  $maillist.on('click', 'tr', function() {
    var mail = $(this).data('mail');
    $('#mailcard .header').text(mail.subject || '无主题');
    $('#mailcard .content:last').html(mail.html);
    $('#mailcard i').click(function() {
      $('#raw').modal('show');
    });
    $('#raw .header').text('RAW');
    $('#raw .content').html($('<pre>').html($('<code>').addClass('language-json').html(JSON.stringify(mail, null, 2))));
    Prism.highlightAll();
  });

  var socket = io();

  var setMailAddress = function(id) {
    localStorage.setItem('shortid', id);
    var mailaddress = id + '@' + location.hostname;
    $('#shortid').val(mailaddress).parent().siblings('button').find('.mail').attr('data-clipboard-text', mailaddress);
    $("#sendemail").attr("href", "mailto:" + mailaddress);
  };

  $('#refreshShortid').click(function() {
    socket.emit('request shortid', true);
  });

  socket.on('connect', function() {
    if(('localStorage' in window)) {
      var shortid = localStorage.getItem('shortid');
      if(!shortid) {
        socket.emit('request shortid', true);
      }
      else {
        socket.emit('set shortid', shortid);
      }
    }
  });

  socket.on('shortid', function(id) {
    setMailAddress(id);
  });

  socket.on('mail', function(mail) {
    Push.create("新邮件", {
      body: "邮件来自："+ mail.from,
      timeout: 4000
    }); 
    $tr = $('<tr>').data('mail', mail);
    $tr
      .append($('<td>').text(mail.from))
      .append($('<td>').text(mail.subject || '无主题'))
      .append($('<td>').text((new Date(mail.date)).toLocaleTimeString()));
    $maillist.prepend($tr);
  });
});
