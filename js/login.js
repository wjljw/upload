$(document).ready(function (c) {
    $('.close').on('click', function (c) {
        $('.login-form').fadeOut('slow', function (c) {
            $('.login-form').remove();
        });
    });

    $(".avtar img").click(function () {
        $(".reg").toggle(1000, function () {
            $(".reg").removeClass("hidden");
        });
        $(".login").toggle(1000);
    });

    $("#saveForm .password").click(function () {
        var name = $("#saveForm .input_name").val();
        if (name != null && name != undefined && name != 'Username' && name != '') {
            findByName(name);
        }
    });

});

function findByName(name) {
    $.ajax({
        url: 'user/findByName',
        type: 'POST',
        dataType: "json",
        data: {"name": name},
        success: function (data) {
            if (data.success == true) {

            } else {
                $('#msgModel').modal('toggle');
                $("#msgModel .msg").text(data.message);
            }
        }
    });
}

function submitUser() {
    var name = $("#submitForm .name").val();
    var pwd = $("#submitForm .password").val();
    if (name == null || name == '') {
        $('#msgModel').modal('toggle');
        $("#msgModel .msg").text("请输入用户名！");
        return;
    }
    if (pwd == null || pwd == '') {
        $('#msgModel').modal('toggle');
        $("#msgModel .msg").text("请输入密码！");
        return;
    }
	
	// var result = sendPost("/user/onLogin", $('#saveForm').serialize());
	// console.log(result)

	var path = servicePath() + 'user/onLogin';
    $.ajax({
        url: path,
        type: 'POST',
        dataType: "json",
        data: $('#submitForm').serialize(),
        success: function (data) {
			window.location.href = "../send-info.html";
            if (data.success == true) {
                window.location.href = "../send-info.html";
            } else {
                // $('#msgModel').modal('toggle');
                // $("#msgModel .msg").text(data.message);
            }
        },
        error: function (arg1) {
            console.log(arg1);

            $('#msgModel').modal('toggle');
            $("#msgModel .msg").text(arg1.responseJSON.message);

        }
    })
};

function saveUser() {
    var name = $("#saveForm .name").val();
    var pwd = $("#saveForm .password").val();
    var confirm_pwd = $("#saveForm .confirm_pwd").val();
    var phone = $("#saveForm .phone").val();
    var email = $("#saveForm .email").val();
    if (name == null || name == '') {
        $('#msgModel').modal('toggle');
        $("#msgModel .msg").text("请输入用户名！");
        return;
    }
    if (pwd == null || pwd == '') {
        $('#msgModel').modal('toggle');
        $("#msgModel .msg").text("请输入密码！");
        return;
    }
    if (confirm_pwd == null || confirm_pwd == '') {
        $('#msgModel').modal('toggle');
        $("#msgModel .msg").text("请输入确认密码！");
        return;
    }
    if (pwd != confirm_pwd) {
        $('#msgModel').modal('toggle');
        $("#msgModel .msg").text("两次密码输入不一致哦！");
        return;
    }
    if (phone == null || phone == '') {
        $('#msgModel').modal('toggle');
        $("#msgModel .msg").text("请输入号码！");
        return;
    }
    if (email == null || email == '') {
        $('#msgModel').modal('toggle');
        $("#msgModel .msg").text("请输入邮箱密码！");
        return;
    }

    $.ajax({
        url: 'user/addUser',
        type: 'POST',
        dataType: "json",
        data: $('#saveForm').serialize(),
        success: function (data) {
            console.log(data);
            if (data.success == true) {
                $('#msgModel').modal('toggle');
                $("#msgModel .msg").text("注册成功！");
                setTimeout(function () {
                    $('#msgModel').modal().clone();
                    window.location.href = "user";
                },2000);
            }
        },
        error: function (arg1) {
            console.log(arg1);

            if (arg1.status == 200) {

            } else {
                if (arg1.responseJSON != undefined) {
                    $('#msgModel').modal('toggle');
                    $("#msgModel .msg").text(arg1.responseJSON.message);
                }
            }

        }
    })
};