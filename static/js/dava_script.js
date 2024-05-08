// index
function num2str (count) {
  if (count > 10000) {
    return parseInt(count / 1000) + 'k'
  }
  if (count > 500) {
    return parseInt(count / 100) / 10 + 'k'
  }
  if (count == 0) {
    return ''
  }
  return count
}

function time2str (date) {
  let today = new Date()
  let time = (today - date) / 1000 / 60 // minutes

  if (time < 60) {
    return parseInt(time) + ' minutes ago'
  }
  time = time / 60 // hours
  if (time < 24) {
    return parseInt(time) + ' hours ago'
  }
  time = time / 24 // days
  if (time < 7) {
    return parseInt(time) + ' days ago'
  }
  return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`
}

function post () {
  let comment = $('#textarea-post').val()
  let today = new Date().toISOString()
  $.ajax({
    type: 'POST',
    url: '/posting',
    data: {
      comment_give: comment,
      date_give: today
    },
    success: function (response) {
      $('#modal-post').removeClass('is-active')
      window.location.reload()
    }
  })
}

function get_posts (username) {
  if (username === undefined) {
    username = ''
  }
  $('#post-box').empty()
  $.ajax({
    type: 'GET',
    url: `/get_posts?username_give=${username}`,
    data: {},
    success: function (response) {
      if (response['result'] === 'success') {
        let posts = response['posts']
        for (let i = 0; i < posts.length; i++) {
          let post = posts[i]
          let time_post = new Date(post['date'])
          let time_before = time2str(time_post)
          let post_id = post['_id'];
          let class_heart = post['heart_by_me'] ? 'fa-heart' : 'fa-heart-o'
          let class_star = post['star_by_me'] ? 'fa-star' : 'fa-star-o'
          let class_thumbsup = post['thumbsup_by_me']
            ? 'fa-thumbs-up'
            : 'fa-thumbs-o-up'
          let html_temp = `<div class="box" id="${post['_id']}">
                                    <article class="media">
                                        <div class="media-left">
                                            <a class="image is-64x64" href="/user/${
                                              post['username']
                                            }">
                                                <img class="is-rounded hiyaa-bordered" src="/static/${
                                                  post['profile_pic_real']
                                                }"
                                                     alt="Image">
                                            </a>
                                        </div>
                                        <div class="media-content">
                                            <div class="content">
                                                <p class="has-text-success-light">
                                                    <strong class="has-text-success-light">${
                                                      post['profile_name']
                                                    }</strong> <small>@${
            post['username']
          }</small> <small>${time_before}</small>
                                                    <br>
                                                    ${post['comment']}
                                                </p>
                                            </div>
                                            <nav class="level is-mobile">
                                                <div class="level-left">
                                                    <a class="level-item is-sparta" aria-label="heart" onclick="toggle_like('${
                                                      post['_id']
                                                    }', 'heart')">
                                                        <span class="icon is-small"><i class="fa ${class_heart}" aria-hidden="true"></i></span>&nbsp;<span class="like-num">${num2str(
            post['count_heart']
          )}</span>
                                                    </a>

                                                    <a class="level-item is-sparta" aria-label="star" onclick="toggle_star('${
                                                      post['_id']
                                                    }', 'star')">
                                                        <span class="icon is-small"><i class="fa ${class_star}" aria-hidden="true"></i></span>&nbsp;<span class="like-num">${num2str(
            post['count_star']
          )}</span>
                                                    </a>

                                                    <a class="level-item is-sparta" aria-label="thumbsup" onclick="toggle_jempol('${
                                                      post['_id']
                                                    }', 'thumbsup')">
                                                        <span class="icon is-small"><i class="fa ${class_thumbsup}" aria-hidden="true"></i></span>&nbsp;<span class="like-num">${num2str(
            post['count_thumbsup']
          )}</span>
                                                    </a>


                                                </div>

                                            </nav>
                                        </div>
                                    </article>
                                </div>`

          let html_temp2 = `<div class="box" id="${post['_id']}">
          <article class="media">
              <div class="media-left">
                  <a class="image is-64x64" href="/user/${
                    post['username']
                  }">
                      <img class="is-rounded hiyaa-bordered" src="/static/${
                        post['profile_pic_real']
                      }"
                           alt="Image">
                  </a>
              </div>
              <div class="media-content">
                  <div class="content">
                      <p class="has-text-success-light">
                          <strong class="has-text-success-light">${
                            post['profile_name']
                          }</strong> <small>@${
post['username']
}</small> <small>${time_before}</small>
                          <br>
                          ${post['comment']}
                      </p>
                  </div>
                  <nav class="level is-mobile">
                      <div class="level-left">
                          <a class="level-item is-sparta" aria-label="heart" onclick="toggle_like('${
                            post['_id']
                          }', 'heart')">
                              <span class="icon is-small"><i class="fa ${class_heart}" aria-hidden="true"></i></span>&nbsp;<span class="like-num">${num2str(
post['count_heart']
)}</span>
                          </a>

                          <a class="level-item is-sparta" aria-label="star" onclick="toggle_star('${
                            post['_id']
                          }', 'star')">
                              <span class="icon is-small"><i class="fa ${class_star}" aria-hidden="true"></i></span>&nbsp;<span class="like-num">${num2str(
post['count_star']
)}</span>
                          </a>

                          <a class="level-item is-sparta" aria-label="thumbsup" onclick="toggle_jempol('${
                            post['_id']
                          }', 'thumbsup')">
                              <span class="icon is-small"><i class="fa ${class_thumbsup}" aria-hidden="true"></i></span>&nbsp;<span class="like-num">${num2str(
post['count_thumbsup']
)}</span>
                          </a>


                      </div>
                      <button id="del-button" class="button is-dark has-text-danger hiyaa-bordered is-hidden"> <i class="ri-delete-bin-5-line" onclick="delete_post('${post_id}')"></i></button>
                  </nav>
              </div>
          </article>
      </div>`

      if(username === '') {
        $('#post-box').append(html_temp)
      } else {
        $('#post-box').append(html_temp2)
      }
          
        }
      }
    }
  })
}
// 

function delete_post(post_id) {
  $.ajax({
    type: 'POST',
    url: '/delete_post',
    data: {
      post_id_give: post_id,
    },
    success: function (response) {
      alert('Postingan Berhasil Dihapus')
      window.location.reload()
    }
  })
}

function toggle_like (post_id, type) {
  console.log(post_id, type)
  let $a_like = $(`#${post_id} a[aria-label='heart']`)
  let $i_like = $a_like.find('i')
  if ($i_like.hasClass('fa-heart')) {
    $.ajax({
      type: 'POST',
      url: '/update_like',
      data: {
        post_id_give: post_id,
        type_give: type,
        action_give: 'unlike'
      },
      success: function (response) {
        console.log('unlike')
        $i_like.addClass('fa-heart-o').removeClass('fa-heart')
        $a_like.find('span.like-num').text(num2str(response['count']))
      }
    })
  } else {
    $.ajax({
      type: 'POST',
      url: '/update_like',
      data: {
        post_id_give: post_id,
        type_give: type,
        action_give: 'like'
      },
      success: function (response) {
        console.log('like')
        $i_like.addClass('fa-heart').removeClass('fa-heart-o')
        $a_like.find('span.like-num').text(num2str(response['count']))
      }
    })
  }
}

function toggle_star (post_id, type) {
  console.log(post_id, type)
  let $a_like = $(`#${post_id} a[aria-label='star']`)
  let $i_like = $a_like.find('i')
  if ($i_like.hasClass('fa-star')) {
    $.ajax({
      type: 'POST',
      url: '/update_like',
      data: {
        post_id_give: post_id,
        type_give: type,
        action_give: 'unlike'
      },
      success: function (response) {
        console.log('unlike')
        $i_like.addClass('fa-star-o').removeClass('fa-star')
        $a_like.find('span.like-num').text(num2str(response['count']))
      }
    })
  } else {
    $.ajax({
      type: 'POST',
      url: '/update_like',
      data: {
        post_id_give: post_id,
        type_give: type,
        action_give: 'like'
      },
      success: function (response) {
        console.log('like')
        $i_like.addClass('fa-star').removeClass('fa-star-o')
        $a_like.find('span.like-num').text(num2str(response['count']))
      }
    })
  }
}

function toggle_jempol (post_id, type) {
  console.log(post_id, type)
  let $a_like = $(`#${post_id} a[aria-label='thumbsup']`)
  let $i_like = $a_like.find('i')
  if ($i_like.hasClass('fa-thumbs-up')) {
    $.ajax({
      type: 'POST',
      url: '/update_like',
      data: {
        post_id_give: post_id,
        type_give: type,
        action_give: 'unlike'
      },
      success: function (response) {
        console.log('unlike')
        $i_like.addClass('fa-thumbs-o-up').removeClass('fa-thumbs-up')
        $a_like.find('span.like-num').text(num2str(response['count']))
      }
    })
  } else {
    $.ajax({
      type: 'POST',
      url: '/update_like',
      data: {
        post_id_give: post_id,
        type_give: type,
        action_give: 'like'
      },
      success: function (response) {
        console.log('like')
        $i_like.addClass('fa-thumbs-up').removeClass('fa-thumbs-o-up')
        $a_like.find('span.like-num').text(num2str(response['count']))
      }
    })
  }
}

// LOGIN

function sign_in () {
  let username = $('#input-username').val()
  let password = $('#input-password').val()

  if (username === '') {
    $('#help-id-login').text('Please input your id.')
    $('#input-username').focus()
    return
  } else {
    $('#help-id-login').text('')
  }

  if (password === '') {
    $('#help-password-login').text('Please input your password.')
    $('#input-password').focus()
    return
  } else {
    $('#help-password-login').text('')
  }

  console.log(username, password)
  $.ajax({
    type: 'POST',
    url: '/sign_in',
    data: {
      username_give: username,
      password_give: password
    },
    success: function (response) {
      if (response['result'] === 'success') {
        $.cookie('mytoken', response['token'], { path: '/' })
        window.location.replace('/')
      } else {
        alert(response['msg'])
      }
    }
  })
}

function sign_up () {
  let i_password2 = $('#input-password2')
  let i_password = $('#input-password')
  let username = $('#input-username').val()
  let password = i_password.val()
  let password2 = $('#input-password2').val()
  let help_Id = $('#help-id')

  if (help_Id.hasClass('is-danger')) {
    alert('Tolong Cek ID Kamu!')
    return
  } else if (!help_Id.hasClass('has-text-success-light')) {
    alert('tolong cek kembali ID yang digunakan, terdapat kesalahan disana')
    return
  }

  let helpPassword = $('#help-password')

  if (password === '') {
    helpPassword
      .text('Silakan Masukkan Password Anda')
      .removeClass()
      .addClass('help is-danger')
    i_password.focus()
    return
  } else if (!is_password(password)) {
    helpPassword
      .text(
        'Untuk Password, silakan ketik 8-20 huruf, Angka, atau huruf spesial(!@#$%^&*)'
      )
      .removeClass()
      .addClass('help is-danger')
    i_password.focus()
    return
  } else {
    helpPassword
      .text('Password Bisa Digunakan!')
      .removeClass()
      .addClass('help has-text-success-light')
  }

  let helpPassword2 = $('#help-password2')

  if (password2 === '') {
    helpPassword2
      .text('Silakan Masukkan Confirm Password')
      .removeClass()
      .addClass('help is-danger')
    i_password2.focus()
    return
  }

  if (password !== password2) {
    helpPassword2
      .text('Confirm Password Tidak Cocok dengan Password')
      .removeClass()
      .addClass('help is-danger')
    i_password2.focus()
    return
  }

  $.ajax({
    type: 'POST',
    url: '/sign_up/save',
    data: {
      username_give: username,
      password_give: password
    },
    success: function (response) {
      alert('You are register Nice!')
      window.location.replace('/login')
    }
  })
}

function toggle_sign_up () {
  $('#sign-up-box').toggleClass('is-hidden')
  $('#div-sign-in-or-up').toggleClass('is-hidden')
  $('#btn-check-dup').toggleClass('is-hidden')
  $('#help-id').toggleClass('is-hidden')
  $('#help-password').toggleClass('is-hidden')
  $('#help-password2').toggleClass('is-hidden')
}

function is_nickname (asValue) {
  let regExp = /^(?=.*[a-zA-Z])[-a-zA-Z0-9_.]{2,10}$/
  return regExp.test(asValue)
}
function is_password (asValue) {
  let regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z!@#$%^&*]{8,20}$/
  return regExp.test(asValue)
}

function check_dup () {
  let i_user = $('#input-username')
  let help_Id = $('#help-id')
  let username = i_user.val()
  if (!username) {
    help_Id.text('ID kamu Kosong Loh!').removeClass().addClass('help is-danger')
    i_user.focus()
    return
  }

  if (!is_nickname(username)) {
    help_Id
      .text(
        'Untuk ID, silakan ketik 2-10 huruf, Angka, atau huruf spesial (-_.)'
      )
      .removeClass()
      .addClass('help is-danger')
    i_user.focus()
    return
  }

  help_Id.addClass('is-loading')

  $.ajax({
    type: 'POST',
    url: '/sign_up/check_dup',
    data: {
      username_give: username
    },
    success: function (response) {
      if (response['exists']) {
        help_Id
          .text('ID sudah terpakai, gunakan ID lain ya')
          .removeClass()
          .addClass('help is-danger')
        i_user.focus()
      } else {
        help_Id
          .text('ID bisa digunakan!')
          .removeClass()
          .addClass('help has-text-success-light')
      }
      help_Id.removeClass('is-loading')
    }
  })
}

function clear_Inputan () {
  $('#input-username').val('')
  $('#input-password').val('')
  $('#input-password2').val('')
}

function sign_out () {
  $.removeCookie('mytoken', { path: '/' })
  alert('Kamu telah Logged Out!')
  window.location.href = '/login'
}

function update_profile () {
  let name = $('#input-name').val()
  let file = $('#input-pic')[0].files[0]
  let about = $('#textarea-about').val()
  let form_data = new FormData()
  form_data.append('file_give', file)
  form_data.append('name_give', name)
  form_data.append('about_give', about)

  $.ajax({
    type: 'POST',
    url: '/update_profile',
    data: form_data,
    cache: false,
    contentType: false,
    processData: false,
    success: function (response) {
      if (response['result'] === 'success') {
        alert(response['msg'])
        window.location.reload()
      }
    }
  })
}
