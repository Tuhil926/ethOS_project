<!DOCTYPE html>
<?php
    $usererror="";
    if($_SERVER["REQUEST_METHOD"]=="POST")
    {
        if(!preg_match('/^[a-zA-Z0-9!#$%&\'*+\-.^_`|~]+$/',$_POST["username"]))
        {
            $usererror="Invalid Username";
        }
        else
        {
            $username=$_POST["username"];
            $progress=0;
            session_start();
            if(isset($_COOKIE[$username]))
            {
                $progress=$_COOKIE[$username];
            }
            else
            {
                $progress=0;
                setcookie($username,$progress,(86400*30),"/");
            }
            $_SESSION["username"]=$username;
            $_SESSION["progress"]=$progress;
            header("Location: ../index.html");
            exit();
        }
    }
?>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lambda Leap</title>
    <link href="./index.css" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;700&display=swap" rel="stylesheet">
</head>
<body>
    <header>
        <h1 id="title">Lambda Leap</h1>
    </header>
    <div id="main-container">
        <form action="./index.php" method="POST">
            <label for="username" id="userLabel">Enter your username</label><br>
            <input type="text" name="username" id="userName" required>
            <p style="color:red;"> <?php echo $usererror;?></p><br>
            <input type="submit" value="Play!" id=submit>
        </form>
    </div>
</body>
</html>