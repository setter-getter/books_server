from rest_framework import viewsets
from books_base.models import Book
from books_base.serializers import BookSerializer
from rest_framework import filters


class ViewBook(viewsets.ModelViewSet):
    queryset = Book.objects.all()

    serializer_class = BookSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'description', 'author']