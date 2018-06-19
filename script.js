$(document).ready(function() {
  var expStr = "";
  var prev = "";

  $("#num0").on("click", function() {
    exp("0");
  });
  $("#num1").on("click", function() {
    exp("1");
  });
  $("#num2").on("click", function() {
    exp("2");
  });
  $("#num3").on("click", function() {
    exp("3");
  });
  $("#num4").on("click", function() {
    exp("4");
  });
  $("#num5").on("click", function() {
    exp("5");
  });
  $("#num6").on("click", function() {
    exp("6");
  });
  $("#num7").on("click", function() {
    exp("7");
  });
  $("#num8").on("click", function() {
    exp("8");
  });
  $("#num9").on("click", function() {
    exp("9");
  });
  $("#op_add").on("click", function() {
    exp(" + ");
  });
  $("#op_subtract").on("click", function() {
    exp(" - ");
  });
  $("#op_multiply").on("click", function() {
    exp(" * ");
  });
  $("#op_divide").on("click", function() {
    exp(" / ");
  });
  $("#period").on("click", function() {
    exp(".");
  });
  $("#clear").on("click", function() {
    exp("clear");
  });
  $("#eval_expr").on("click", function() {
    exp("expr");
  });

  function exp(str) {
    var numbersP = /\.|[0-9]/gi;
    var numbers = /[0-9]/gi;
    var ops = /\+|\-|\/|\*/gi;
    var period = /\./gi;

    if (str.search(numbers) >= 0) {
      //any digit input
      $("#display").html("0");
      if (prev.search(numbersP) >= 0) {
        //any digit input or period
        prev += str;
        //console.log("a number");
      } else {
        //first digit between operators
        prev = str;
      }
      expStr += str;
    } else if (str == "clear") {
      //clear values
      prev = "";
      expStr = "";
      $("#display").html("0");
    } else if (str == "expr" && prev != "") {
      //evaluate the expression
      if (expStr != "") {
        //must have some expression
        if (prev.search(ops) > -1) {
          //remove last operator if it was entered before evaluating
          expStr = expStr.slice(0, -3);
        }
        prev = ""; //reset
        calculate(expStr.split(" "));
      }
    } else if (prev.length > 0 && str.search(ops) > -1) {
      //input operator, only one, and cannot be at the beginning
      if (prev.search(ops) == -1) {
        //no consecutive operators
        prev = str;
        expStr += str;
      }
    } else if (str == ".") {
      //input period
      if (prev.search(period) == -1) {
        //no more than one period per number
        //no periods before
        //console.log("period");
        if (prev.search(numbers) == -1) {
          //add a zero before the period
          //no numbers before
          str = "0.";
          prev = "0.";
          $("#display").html("0");
        } else {
          prev += str;
        }
        expStr += str;
      }
    }
    $("#current").html(expStr);
  }

  function calculate(arr) {
    var result = 0;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] === "*") {
        result = Number.parseFloat(arr[i - 1]) * Number.parseFloat(arr[i + 1]);
        arr.splice(i - 1, 3, result.toString());
        i = i - 1;
      } else if (arr[i] === "/") {
        result = Number.parseFloat(arr[i - 1]) / Number.parseFloat(arr[i + 1]);
        arr.splice(i - 1, 3, result.toString());
        i = i - 1;
      }
    }
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] === "+") {
        result = Number.parseFloat(arr[i - 1]) + Number.parseFloat(arr[i + 1]);
        arr.splice(i - 1, 3, result.toString());
        i = i - 1;
      } else if (arr[i] === "-") {
        result = Number.parseFloat(arr[i - 1]) - Number.parseFloat(arr[i + 1]);
        arr.splice(i - 1, 3, result.toString());
        i = i - 1;
      }
    }
    $("#display").html(Number.parseFloat(arr));
    expStr = "";
  }
});
