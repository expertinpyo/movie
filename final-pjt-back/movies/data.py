import requests
import json
import os

def normal_movie_data():
    total_data = []
    TMDB_KEY = os.environ.get('SECRET_KEY')
    print(TMDB_KEY)
    for i in range(1, 3):
        url = f'https://api.themoviedb.org/3/movie/popular?api_key={TMDB_KEY}&language=ko-KR&page={i}'
        movie_datas = requests.get(url).json()
        for movie in movie_datas.get('results'):
            if movie.get('release_date', '') and movie.get('genre_ids', ''):
                fields = {
                    'movie_id': movie['id'],
                    'title': movie['title'],
                    'genre_ids': movie['genre_ids'],
                    'release_date': movie['release_date'],
                    'vote_average': movie['vote_average'],
                    'popularity': movie['popularity'],
                    'overview': movie['overview'],
                    'poster_path': movie['poster_path'],
                }

                data = {
                    'pk': movie['id'],
                    'model': 'movies.movie',
                    'fields': fields,
                }
                total_data.append(data)
    with open('movie_data.json', 'w', encoding='utf-8') as w:
        json.dumps(total_data, w, indent='\t', ensure_ascii=False)
    print(total_data)

normal_movie_data()