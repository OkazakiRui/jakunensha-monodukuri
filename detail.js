$(function () {
  const id = location.hash.slice(1);
  const detailEl = document.getElementById('detail');
  $.ajax({
    url: `https://click.ecc.ac.jp/ecc/rokazaki/jakunenApi/api/${id}`,
    dataType: 'json',
    type: 'get',
    cache: false,
  })
    .done(function (data) {
      // console.log(data[0].title);

      if (data[0].streaming) {
        detailEl.innerHTML = `
      <div class="detail-img"><img src="${data[0].image}" alt="${data[0].title}の画像"></div>

      <div class="detail-texts">
        <h3 class="f3">${data[0].title}<br><span class="tag">${data[0].screening_time}分</span><span class="tag">${data[0].genre}</span><span class="tag">オンライン視聴可</span></h3>
        <p>${data[0].description}</p>
        <p>評価:<span>${data[0].score}</span></p>
        <a class="button" href="./yoyaku.html">予約する</a>
        <a class="button" href="./yoyaku.html">オンラインで視聴する</a>
      </div>
      `;
      } else {
        detailEl.innerHTML = `
      <div class="detail-img"><img src="${data[0].image}" alt="${data[0].title}の画像"></div>

      <div class="detail-texts">
        <h3 class="f3">${data[0].title}<br><span class="tag">${data[0].screening_time}分</span><span class="tag">${data[0].genre}</span><span class="tag">オンライン視聴不可</span></h3>
        <p>${data[0].description}</p>
        <p>おすすめ度:<span>${data[0].score}%</span></p>
        <a class="button" href="./yoyaku.html">予約する</a>
      </div>
      `;
      }
    })
    .fail(function (e1, e2, e3) {
      console.log(e1);
      console.log(e2);
      console.log(e3);
    });
});
