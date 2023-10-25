$(()=>{
    const socket=io.connect();

    const $nickForm=$('#nickForm');
    const $nickError=$('#nickError');
    const $nickname=$('#nickname');

    const $messageForm=$('#message-form');
    const $messageBox=$('#message');
    const $chat=$('#chat');

    const $users = $("#usernames");

    socket.on('load old msgs', msgs=>{
        for(let i=msgs.length-1;i>=0;i--){
            displayMsg(msgs[i])
        }
    });

    $nickForm.submit(e=>{
        e.preventDefault();
        socket.emit('new user', $nickname.val(), data=>{
            if(data){
                $('#nickWrap').hide();
                document.getElementById('contentWrap').style.display='flex';
                $messageBox.focus();
            }else{
                $nickError.html(`
                    <div class="alert alert-danger">
                        That username already
                    </div>
                `);
            }
        })
        $nickname.val('');
    });

    $messageForm.submit(e=>{
        e.preventDefault();
        socket.emit('send message',$messageBox.val(), data=>{
            $chat.append(`<p class="error">${data}</p>`)
        });
        $messageBox.val('');
    });

    socket.on('new message', data=>{
        displayMsg(data);
    });

    socket.on('usernames',data=>{
        let html='';
        for(let i=0; i<data.length; i++){
            html+=`<p><i class="fas fa-user"></i>${data[i]}</p>`
        }
        $users.html(html);
    });

    socket.on('whisper', data=>{
        $chat.append(`<p class="whisper"><b>${data.nick}</b>: ${data.msg}</p>`)
    })

    function displayMsg(data) {
        $chat.append(
          `<p class="p-2 bg-secondary w-75 animate__animated animate__backInUp"><b>${data.nick}</b>: ${data.msg}</p>`
        );
        const chat_ = document.querySelector("#chat");
        chat_.scrollTop = chat_.scrollHeight;
    }
})