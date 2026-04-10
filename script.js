var g = function (id) {
  return document.getElementById(id);
};
var num = function (id) {
  return parseFloat(g(id).value) || 0;
};
var val = function (id) {
  return g(id).value.trim();
};

var pct = function (a, b) {
  return b > 0 ? ((a / b) * 100).toFixed(2) + " %" : "0.00 %";
};
var money = function (v) {
  return isFinite(v) ? v.toFixed(2) + " $" : "—";
};
var loc = function (v) {
  return v >= 0 ? Math.round(v).toLocaleString("uk-UA") : "—";
};

function getCalc() {
  var reach = num("i-reach");
  var impr = num("i-impr");
  var leads = num("i-leads");
  var sales = num("i-sales");
  var budget = num("i-budget");
  var check = num("i-check");

  var p1 = pct(impr, reach);
  var p2 = pct(leads, impr);
  var p3 = pct(sales, leads);

  var cpl = leads > 0 ? budget / leads : 0;
  var cpa = sales > 0 ? budget / sales : 0;
  var rev = check > 0 && sales > 0 ? check * sales : 0;
  var prof = rev > 0 ? rev - budget : 0;
  var roi = budget > 0 && rev > 0 ? ((rev - budget) / budget) * 100 : 0;

  return {
    reach: reach,
    impr: impr,
    leads: leads,
    sales: sales,
    budget: budget,
    check: check,
    p1: p1,
    p2: p2,
    p3: p3,
    cpl: cpl,
    cpa: cpa,
    rev: rev,
    prof: prof,
    roi: roi,
  };
}

function updateAutoFields(d) {
  g("o-p1").value = d.p1;
  g("o-p2").value = d.p2;
  g("o-p3").value = d.p3;
  g("o-cpl").value = money(d.cpl);
  g("o-cpa").value = money(d.cpa);
  g("o-rev").value = money(d.rev);
  g("o-roi").value = d.roi.toFixed(2) + " %";
}

function makeSVG(d, scale) {
  var S = scale || 1;
  var lc = function (v) {
    return v >= 0 ? Math.round(v).toLocaleString("uk-UA") : "—";
  };
  var pt = function (x, y) {
    return x * S + "," + y * S;
  };
  var pts = function (arr) {
    return arr
      .map(function (xy) {
        return pt(xy[0], xy[1]);
      })
      .join(" ");
  };

  var showP1 = d.p1 !== "—";
  var showP2 = d.p2 !== "—";
  var showP3 = d.p3 !== "—";

  var svg = "";
  svg +=
    '<svg width="' +
    580 * S +
    '" height="' +
    420 * S +
    '" viewBox="0 0 ' +
    580 * S +
    " " +
    420 * S +
    '" xmlns="http://www.w3.org/2000/svg" font-family="Arial,sans-serif">';

  svg +=
    '<polygon points="' +
    pts([
      [60, 18],
      [520, 18],
      [456, 118],
      [124, 118],
    ]) +
    '" fill="#5BA3D0"/>';
  svg +=
    '<polygon points="' +
    pts([
      [124, 122],
      [456, 122],
      [390, 222],
      [190, 222],
    ]) +
    '" fill="#2E75B6"/>';
  svg +=
    '<polygon points="' +
    pts([
      [190, 226],
      [390, 226],
      [328, 316],
      [252, 316],
    ]) +
    '" fill="#1B5E9E"/>';
  svg +=
    '<polygon points="' +
    pts([
      [252, 320],
      [328, 320],
      [290, 398],
    ]) +
    '" fill="#0F3F72"/>';

  svg +=
    '<line x1="' +
    pt(124, 120) +
    '" x2="' +
    pt(456, 120) +
    '" stroke="white" stroke-width="' +
    2 * S +
    '"/>';
  svg +=
    '<line x1="' +
    pt(190, 224) +
    '" x2="' +
    pt(390, 224) +
    '" stroke="white" stroke-width="' +
    2 * S +
    '"/>';
  svg +=
    '<line x1="' +
    pt(252, 318) +
    '" x2="' +
    pt(328, 318) +
    '" stroke="white" stroke-width="' +
    2 * S +
    '"/>';

  svg +=
    '<text x="' +
    290 * S +
    '" y="' +
    76 * S +
    '" text-anchor="middle" fill="white" font-size="' +
    27 * S +
    '" font-weight="bold">' +
    lc(d.reach) +
    "</text>";
  svg +=
    '<text x="' +
    290 * S +
    '" y="' +
    178 * S +
    '" text-anchor="middle" fill="white" font-size="' +
    25 * S +
    '" font-weight="bold">' +
    lc(d.impr) +
    "</text>";
  svg +=
    '<text x="' +
    290 * S +
    '" y="' +
    276 * S +
    '" text-anchor="middle" fill="white" font-size="' +
    23 * S +
    '" font-weight="bold">' +
    lc(d.leads) +
    "</text>";
  svg +=
    '<text x="' +
    290 * S +
    '" y="' +
    364 * S +
    '" text-anchor="middle" fill="white" font-size="' +
    21 * S +
    '" font-weight="bold">' +
    lc(d.sales) +
    "</text>";

  if (showP1) {
    svg +=
      '<rect x="' +
      2 * S +
      '" y="' +
      109 * S +
      '" width="' +
      82 * S +
      '" height="' +
      24 * S +
      '" rx="' +
      3 * S +
      '" fill="white" stroke="#2E75B6" stroke-width="' +
      1.5 * S +
      '"/>';
    svg +=
      '<text x="' +
      43 * S +
      '" y="' +
      125 * S +
      '" text-anchor="middle" fill="#333" font-size="' +
      12 * S +
      '" font-weight="bold">' +
      d.p1 +
      "</text>";
    svg +=
      '<line x1="' +
      84 * S +
      '" y1="' +
      121 * S +
      '" x2="' +
      124 * S +
      '" y2="' +
      120 * S +
      '" stroke="#2E75B6" stroke-width="' +
      S +
      '"/>';
  }
  if (showP2) {
    svg +=
      '<rect x="' +
      2 * S +
      '" y="' +
      213 * S +
      '" width="' +
      82 * S +
      '" height="' +
      24 * S +
      '" rx="' +
      3 * S +
      '" fill="white" stroke="#2E75B6" stroke-width="' +
      1.5 * S +
      '"/>';
    svg +=
      '<text x="' +
      43 * S +
      '" y="' +
      229 * S +
      '" text-anchor="middle" fill="#333" font-size="' +
      12 * S +
      '" font-weight="bold">' +
      d.p2 +
      "</text>";
    svg +=
      '<line x1="' +
      84 * S +
      '" y1="' +
      225 * S +
      '" x2="' +
      190 * S +
      '" y2="' +
      224 * S +
      '" stroke="#2E75B6" stroke-width="' +
      S +
      '"/>';
  }
  if (showP3) {
    svg +=
      '<rect x="' +
      2 * S +
      '" y="' +
      309 * S +
      '" width="' +
      82 * S +
      '" height="' +
      24 * S +
      '" rx="' +
      3 * S +
      '" fill="white" stroke="#2E75B6" stroke-width="' +
      1.5 * S +
      '"/>';
    svg +=
      '<text x="' +
      43 * S +
      '" y="' +
      325 * S +
      '" text-anchor="middle" fill="#333" font-size="' +
      12 * S +
      '" font-weight="bold">' +
      d.p3 +
      "</text>";
    svg +=
      '<line x1="' +
      84 * S +
      '" y1="' +
      321 * S +
      '" x2="' +
      252 * S +
      '" y2="' +
      318 * S +
      '" stroke="#2E75B6" stroke-width="' +
      S +
      '"/>';
  }

  svg +=
    '<rect x="' +
    496 * S +
    '" y="' +
    54 * S +
    '" width="' +
    82 * S +
    '" height="' +
    24 * S +
    '" rx="' +
    3 * S +
    '" fill="white" stroke="#2E75B6" stroke-width="' +
    1.5 * S +
    '"/>';
  svg +=
    '<text x="' +
    537 * S +
    '" y="' +
    70 * S +
    '" text-anchor="middle" fill="#1F5C99" font-size="' +
    11 * S +
    '" font-weight="bold">Охоплення</text>';
  svg +=
    '<line x1="' +
    496 * S +
    '" y1="' +
    66 * S +
    '" x2="' +
    456 * S +
    '" y2="' +
    66 * S +
    '" stroke="#2E75B6" stroke-width="' +
    S +
    '"/>';

  svg +=
    '<rect x="' +
    496 * S +
    '" y="' +
    159 * S +
    '" width="' +
    82 * S +
    '" height="' +
    24 * S +
    '" rx="' +
    3 * S +
    '" fill="white" stroke="#2E75B6" stroke-width="' +
    1.5 * S +
    '"/>';
  svg +=
    '<text x="' +
    537 * S +
    '" y="' +
    175 * S +
    '" text-anchor="middle" fill="#1F5C99" font-size="' +
    11 * S +
    '" font-weight="bold">Покази</text>';
  svg +=
    '<line x1="' +
    496 * S +
    '" y1="' +
    171 * S +
    '" x2="' +
    390 * S +
    '" y2="' +
    171 * S +
    '" stroke="#2E75B6" stroke-width="' +
    S +
    '"/>';

  svg +=
    '<rect x="' +
    496 * S +
    '" y="' +
    258 * S +
    '" width="' +
    82 * S +
    '" height="' +
    24 * S +
    '" rx="' +
    3 * S +
    '" fill="white" stroke="#2E75B6" stroke-width="' +
    1.5 * S +
    '"/>';
  svg +=
    '<text x="' +
    537 * S +
    '" y="' +
    274 * S +
    '" text-anchor="middle" fill="#1F5C99" font-size="' +
    11 * S +
    '" font-weight="bold">Звернень</text>';
  svg +=
    '<line x1="' +
    496 * S +
    '" y1="' +
    270 * S +
    '" x2="' +
    328 * S +
    '" y2="' +
    270 * S +
    '" stroke="#2E75B6" stroke-width="' +
    S +
    '"/>';

  svg +=
    '<rect x="' +
    496 * S +
    '" y="' +
    348 * S +
    '" width="' +
    82 * S +
    '" height="' +
    24 * S +
    '" rx="' +
    3 * S +
    '" fill="white" stroke="#2E75B6" stroke-width="' +
    1.5 * S +
    '"/>';
  svg +=
    '<text x="' +
    537 * S +
    '" y="' +
    364 * S +
    '" text-anchor="middle" fill="#1F5C99" font-size="' +
    11 * S +
    '" font-weight="bold">Продажі</text>';
  svg +=
    '<line x1="' +
    496 * S +
    '" y1="' +
    360 * S +
    '" x2="' +
    328 * S +
    '" y2="' +
    358 * S +
    '" stroke="#2E75B6" stroke-width="' +
    S +
    '"/>';

  svg += "</svg>";
  return svg;
}

function svgToBytes(svgStr, w, h) {
  return new Promise(function (resolve, reject) {
    var blob = new Blob([svgStr], {
      type: "image/svg+xml;charset=utf-8",
    });
    var url = URL.createObjectURL(blob);
    var img = new Image();
    img.onload = function () {
      var canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      var ctx = canvas.getContext("2d");
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, w, h);
      ctx.drawImage(img, 0, 0, w, h);
      canvas.toBlob(function (b) {
        b.arrayBuffer().then(function (buf) {
          URL.revokeObjectURL(url);
          resolve(new Uint8Array(buf));
        });
      }, "image/png");
    };
    img.onerror = function () {
      URL.revokeObjectURL(url);
      reject(new Error("SVG to PNG failed"));
    };
    img.src = url;
  });
}

function buildRows(d) {
  var ch = val("i-channel") || "—";
  var rows = [
    ["Рекламні канали", ch],
    ["Рекламний бюджет", money(d.budget)],
    ["Кількість звернень", loc(d.leads)],
    ["CPL (ціна звернення)", money(d.cpl)],
    ["Кількість продажів", loc(d.sales)],
    ["CPA (ціна продажу)", money(d.cpa)],
  ];
  if (d.check >= 0) rows.push(["Сер. Чек", money(d.check)]);
  if (d.rev >= 0) rows.push(["Дохід", money(d.rev)]);
  if (d.rev >= 0) rows.push(["ROI", d.roi.toFixed(1) + " %"]);
  return rows;
}

function renderPreview(d) {
  var rows = buildRows(d);
  var trs = rows
    .map(function (r) {
      return "<tr><td>" + r[0] + "</td><td>" + r[1] + "</td></tr>";
    })
    .join("");
  g("doc").innerHTML =
    '<div class="funnel-box">' +
    makeSVG(d, 1) +
    "</div>" +
    '<table class="mt">' +
    trs +
    "</table>";
}

async function generateDocx() {
  var btn = g("btn-dl");
  var st = g("status");

  if (typeof docx === "undefined") {
    st.textContent = "⏳ Бібліотека завантажується, спробуйте ще раз...";
    st.className = "status err";
    return;
  }

  btn.disabled = true;
  btn.classList.add("btn-loading");
  btn.textContent = "⏳ Генерую документ...";
  st.textContent = "";
  st.className = "status";

  try {
    var Dk = docx;
    var d = getCalc();
    var rows = buildRows(d);

    var svgStr = makeSVG(d, 2);
    var pngData = await svgToBytes(svgStr, 1160, 840);

    var nb = { style: Dk.BorderStyle.NONE, size: 0, color: "FFFFFF" };

    function mRow(label, value, alt) {
      var bg = alt ? "EBF3FA" : "F7FBFF";
      var b = { style: Dk.BorderStyle.SINGLE, size: 2, color: "C8DDEF" };
      var bo = { top: b, bottom: b, left: b, right: b };
      return new Dk.TableRow({
        children: [
          new Dk.TableCell({
            width: { size: 5000, type: Dk.WidthType.DXA },
            borders: bo,
            shading: { fill: bg, type: Dk.ShadingType.CLEAR },
            margins: { top: 90, bottom: 90, left: 180, right: 90 },
            children: [
              new Dk.Paragraph({
                children: [
                  new Dk.TextRun({
                    text: String(label),
                    size: 20,
                    font: "Arial",
                  }),
                ],
              }),
            ],
          }),
          new Dk.TableCell({
            width: { size: 4360, type: Dk.WidthType.DXA },
            borders: bo,
            shading: { fill: bg, type: Dk.ShadingType.CLEAR },
            margins: { top: 90, bottom: 90, left: 180, right: 90 },
            children: [
              new Dk.Paragraph({
                children: [
                  new Dk.TextRun({
                    text: String(value),
                    size: 20,
                    bold: true,
                    font: "Arial",
                    color: "1F5C99",
                  }),
                ],
              }),
            ],
          }),
        ],
      });
    }

    var wordDoc = new Dk.Document({
      sections: [
        {
          properties: {
            page: {
              size: { width: 12240, height: 15840 },
              margin: { top: 1000, right: 920, bottom: 1000, left: 920 },
            },
          },
          children: [
            new Dk.Paragraph({ spacing: { after: 200 }, children: [] }),
            new Dk.Paragraph({
              alignment: Dk.AlignmentType.CENTER,
              spacing: { after: 340 },
              children: [
                new Dk.ImageRun({
                  data: pngData,
                  transformation: { width: 516, height: 374 },
                }),
              ],
            }),
            new Dk.Table({
              width: { size: 9360, type: Dk.WidthType.DXA },
              columnWidths: [5000, 4360],
              borders: {
                top: nb,
                bottom: nb,
                left: nb,
                right: nb,
                insideH: nb,
                insideV: nb,
              },
              rows: rows.map(function (r, i) {
                return mRow(r[0], r[1], i % 2 === 1);
              }),
            }),
          ],
        },
      ],
    });

    var blob = await Dk.Packer.toBlob(wordDoc);
    var url = URL.createObjectURL(blob);
    var a = window.document.createElement("a");
    a.href = url;
    a.download = "Рекламна_Воронка.docx";
    window.document.body.appendChild(a);
    a.click();
    window.document.body.removeChild(a);
    URL.revokeObjectURL(url);

    st.textContent = "✓ Файл успішно завантажено!";
    st.className = "status ok";
  } catch (e) {
    console.error(e);
    st.textContent = "✗ Помилка: " + e.message;
    st.className = "status err";
  } finally {
    btn.disabled = false;
    btn.classList.remove("btn-loading");
    btn.innerHTML =
      '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> Завантажити .docx';
  }
}

[
  "i-channel",
  "i-reach",
  "i-impr",
  "i-leads",
  "i-sales",
  "i-budget",
  "i-check",
].forEach(function (id) {
  g(id).addEventListener("input", function () {
    var d = getCalc();
    updateAutoFields(d);
    renderPreview(d);
  });
});

g("btn-dl").addEventListener("click", generateDocx);

var init = getCalc();
updateAutoFields(init);
renderPreview(init);
