$(document).ready(function() {
  $.ajax({
    url: 'courses.json',
    dataType: 'json',
    success: function(data) {
      var courses = data;

      // 渲染所有课程卡片
      renderCourses(courses);

      // 点击分类按钮或链接时，渲染对应分类的课程卡片
      $('.category-btn').click(function() {
        var category = $(this).data('category');
        var filteredCourses = courses.filter(function(course) {
          return course.category === category;
        });

        renderCourses(filteredCourses);
        renderPagination(filteredCourses);
      });

      // 点击搜索按钮时，筛选符合关键字的课程
      $('#search-btn').click(function() {
        var keyword = $('#search-input').val().toLowerCase();
        var filteredCourses = courses.filter(function(course) {
          return course.title.toLowerCase().includes(keyword);
        });

        renderCourses(filteredCourses);
        renderPagination(filteredCourses);
      });
    }
  });
});

function renderCourses(courses, page = 1, per_page = 9) {
  $('#course-list').empty();

  var start = (page - 1) * per_page;
  var end = start + per_page;
  var slicedCourses = courses.slice(start, end);

  $.each(slicedCourses, function(index, course) {
    var card = '<div class="col-md-4">' +
      '<div class="card">' +
      '<a href='+course.url+'>'+'<img src="' + course.image + '" class="card-img-top" alt="' + course.title + '"></a>' +
      '<div class="card-body">' +
      '<h5 class="card-title">' + course.title + '</h5>' +
      '<p class="card-text">' +
      '<small class="text-muted">' + course.author + '</small><br>' +
      '<small class="text-muted">' + course.source + ' | ' + course.published_at + '</small>' +
      '</p>' +
      '</div>' +
      '</div>' +
      '</div>';

    $('#course-list').append(card);
    
  });
}

function renderPagination(courses, per_page = 9) {
  var num_pages = Math.ceil(courses.length / per_page);
  var pagination = $('#pagination');

  pagination.empty();

  for (var i = 1; i <= num_pages; i++) {
    var li = '<li class="page-item"><a class="page-link" href="#" data-page="' + i + '">' + i + '</a></li>';

    pagination.append(li);
  }

  pagination.find('a').click(function(event) {
    event.preventDefault();

    var page = $(this).data('page');

    renderCourses(courses, page);
  });
}