<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Arkanoid</title>
    <link rel="stylesheet" href="css/style.css" />
    <script type="text/javascript" src="js/libs/jquery-3.0.0.min.js"></script>
  </head>
  <body>
    <div id="mouseVisibilityField" class="mouse_visibility_field">
      <div class="main_container">
        <div class="game_info_container">
          <span id="topInfoLeftMessage" class="top_info_message left"></span>
          <span id="topInfoRightMessage" class="top_info_message right"></span>
          <span id="startAlertMessage" class="start_alert_message">Arkanoid</span>
        </div>
        <div class="game_field_container">
          <div id="canvasContainer" class="canvas_container">
            <canvas id="canvas" class="canvas" width="890" height="495"></canvas>
          </div>
          <div id="gameElements">
            <div class="game_menu">
              <input id="renameButton" class="main_buttons game_menu_element" type="button" value="Change name" />
              <input id="areaForName" class="area_for_name game_menu_element" type="text" placeholder="Name" maxlength="12" />
              <input id="startButton" class="main_buttons game_menu_element" type="button" value="Play" />
              <input id="showTopButton" class="main_buttons game_menu_element" type="button" value="Top" />
              <input id="insertInfo" type="hidden" value="/arkanoid/insert_player_info.php" />
              <input id="selectInfo" type="hidden" value="/arkanoid/select_player_info.php" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="topPlayersBlock" class="top_players_block">
      <div class="top_players_block_content">
        <span class="top_players_block_header">Top players</span>
        <p id="topPlayersParagraph" class="top_players_paragraph"></p>
        <a id="hideTopButton" class="hide_top_button">Return</a>
      </div>
    </div>
    <script type="text/javascript" src="js/Brick.js"></script>
    <script type="text/javascript" src="js/Ball.js"></script>
    <script type="text/javascript" src="js/Platform.js"></script>
    <script type="text/javascript" src="js/Grid.js"></script>
    <script type="text/javascript" src="js/Graphics.js"></script>
    <script type="text/javascript" src="js/Game.js"></script>
    <script type="text/javascript" src="js/GameInterface.js"></script>
    <script type="text/javascript" src="js/GameController.js"></script>
    <script type="text/javascript" src="js/main.js"></script>
  </body>
</html>