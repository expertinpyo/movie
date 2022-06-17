# 220520 Django Url 정리



```python
# finalproject/urls.py

path('admin/', admin.site.urls),	# admin
path('api/v1/accounts/', include('accounts.urls')),				# accounts => profile과 연결
path('api/v1/accounts/', include('dj_rest_auth.urls')),			# accounts => dj_rest_auth form 사용, login, logout등 이것으로 처리
path('api/v1/accounts/signup/', include('dj_rest_auth.registration.urls')),		# 위와 비슷한 맥락, signup 처리
path('api/v1/articles/', include('articles.urls')),				# articles 처리
path('api/v1/movies/', include('movies.urls')),					# movies 처리
```





```python
# movies/urls.py 영화 데이터 조회

path('', views.total_movies),								# 전체 영화 데이터 조회
path('actors/<actor_name>/', views.actors),					# 배우명으로 검색한 영화 데이터 조회
path('director/<director_name>/', views.director),			# 감독명으로 검색한 영화 데이터 조회
path('genre/<genre_name>/', views.genre),					# 장르명으로 검색한 영화 데이터 조회
path('<int:movie_pk>/', views.movie_detail),				# 영화 디테일 페이지, 영화 리뷰* 좋아요 확인 가능
path('<int:movie_pk>/like/', views.movie_like),				# 영화 디테일 좋아요 페이지

path('<int:movie_pk>/review/', views.review_create),		# 영화 리뷰 생성 페이지
path('<int:movie_pk>/review/<int:review_pk>/', views.review_update_or_delete),	# 영화 리뷰 수정, 삭제 페이지

```





```python 
# articles/urls.py 게시판 데이터 조회

path('', views.articles_list_or_create),								# 게시글 조회 및 생성
path('<int:article_pk>/', views.article_detail_or_update_or_delete),	# 게시글 디테일(댓글 및 좋아요확인 가능), 수정 및 삭제 
path('<int:article_pk>/like/', views.like_article),						# 게시글 좋아요 페이지

path('<int:article_pk>/comments/', views.create_comment),				# 게시글 내 댓글 생성
path('<int:article_pk>/comments/<int:comment_pk>/', views.comment_update_or_delete),	# 댓글 삭제 및 수정

```





```python
# accounts/urls.py

path('profile/<username>/', views.profile),		# 프로필 상세페이지, 수정 및 삭제 가능, 이 곳에서 닉네임, 프로필 사진 수정 가능
```



