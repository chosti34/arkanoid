<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Авторизация</title>
  </head>
  <body>
    <form method="post" action="/arkanoid/web/login_process.php">
      <label for="loginInput">
        Логин: <input type="text" name="login" id="loginInput" required />
      </label><br/>
      <label for="passwordInput">
        Пароль: <input type="password" name="password" id="passwordInput" required />
      </label><br/>
      <input type="submit" value="Войти" />
    </form>
  </body>
</html>