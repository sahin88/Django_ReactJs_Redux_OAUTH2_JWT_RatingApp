from rest_framework import permissions


class IsOwner(permissions.BasePermission):
    def has_object_perms(self, request, view, obj):
        return obj.author == self.request.user