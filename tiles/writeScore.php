<?php
  $file = 'score.txt';
  $score = $_POST['score'];
  $result = file_put_contents($file, $score , FILE_APPEND);
  echo $result;
 ?>
