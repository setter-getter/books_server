from django.urls import path, include
from rest_framework.routers import DefaultRouter
from books_base.views import ViewBook

router = DefaultRouter()
router.register('books', ViewBook)


urlpatterns = [
    path('', include(router.urls)),
]



