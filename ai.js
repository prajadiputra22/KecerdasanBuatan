$(function () {
  $("#proses").click(function () {
    var kecepatan = parseFloat($("#kecepatan").val());
    var suhu = parseFloat($("#suhu").val());
    var alfa = new Array(4);
    var z = new Array(4);

    $("#hasil").text(
      "Maka sumber frekuensi yang didapat ketika kecepatan putaran sebesar " +
        kecepatan +
        " dan suhu sebesar " +
        suhu +
        " adalah " +
        prediksiFrekuensi() +
        " Rpm"
    );

    function findMin(x, y) {
      return x <= y ? x : y;
    }

    function kecepatanLambat() {
      if (kecepatan <= 1000) {
        return 1;
      } else if (kecepatan > 1000 && kecepatan < 5000) {
        return (5000 - kecepatan) / (5000 - 1000);
      } else {
        return 0;
      }
    }

    function kecepatanCepat() {
      if (kecepatan >= 5000) {
        return 1;
      } else if (kecepatan > 1000 && kecepatan < 5000) {
        return (kecepatan - 1000) / (5000 - 1000);
      } else {
        return 0;
      }
    }

    function suhuRendah() {
      if (suhu <= 100) {
        return 1;
      } else if (suhu > 100 && suhu < 600) {
        return (600 - suhu) / 500;
      } else {
        return 0;
      }
    }

    function suhuTinggi() {
      if (suhu >= 600) {
        return 1;
      } else if (suhu > 100 && suhu < 600) {
        return (suhu - 100) / 500;
      } else {
        return 0;
      }
    }

    function sumberFrekuensiKecil(alfa) {
      if (alfa > 0 && alfa < 1) {
        return 7000 - alfa * 5000;
      } else if (alfa == 1) {
        return 2000;
      } else {
        return 7000;
      }
    }

    function sumberFrekuensiBesar(alfa) {
      if (alfa > 0 && alfa < 1) {
        return 2000 + alfa * 5000;
      } else if (alfa == 1) {
        return 7000;
      } else {
        return 2000;
      }
    }

    function aturan() {
      alfa[0] = findMin(kecepatanLambat(), suhuTinggi());
      z[0] = sumberFrekuensiKecil(alfa[0]);

      alfa[1] = findMin(kecepatanLambat(), suhuRendah());
      z[1] = sumberFrekuensiKecil(alfa[1]);

      alfa[2] = findMin(kecepatanCepat(), suhuTinggi());
      z[2] = sumberFrekuensiBesar(alfa[2]);

      alfa[3] = findMin(kecepatanCepat(), suhuRendah());
      z[3] = sumberFrekuensiBesar(alfa[3]);
    }

    function defuzzifikasi() {
      var temp1 = 0;
      var temp2 = 0;

      for (var i = 0; i < 4; i++) {
        temp1 += alfa[i] * z[i];
        temp2 += alfa[i];
      }

      return Math.round(temp1 / temp2);
    }

    function prediksiFrekuensi() {
      aturan();
      return defuzzifikasi();
    }
  });
});
