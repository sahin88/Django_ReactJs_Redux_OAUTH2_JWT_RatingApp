from django.contrib import admin

from django.contrib.auth.admin import UserAdmin
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from django.contrib.auth import get_user_model
User = get_user_model()

class UserAdmin(BaseUserAdmin):
    class Meta:
        model = User

    # list_display = ('email', 'username', 'date_joined', 'last_login',
    #                 'is_admin')
    # search_fields = ('username', 'email')
    # filter_horizontal = ()
    # list_filter = ()
    # add_fieldsets = ((None, {
    #     'classes': ('wide', ),
    #     'fields': ('username', 'first_name', 'last_name', 'email', 'password1',
    #                'password2')
    # }), )
    list_display = ( 'email', 'first_name', 'last_name', 'last_login',
                    'is_admin')
    list_filter = ()
    fieldsets = (
        (None, {
            'fields': ('email', 'password')
        }),
        ('Personal info', {
            'fields': ('last_login', )
        }),
        ('Permissions', {
            'fields':
            ('username', 'is_admin', 'is_active', 'is_staff', 'is_superuser')
        }),
    )
    # add_fieldsets is not a standard ModelAdmin attribute. UserAdmin
    # overrides get_fieldsets to use this attribute when creating a user.
    add_fieldsets = ((None, {
        'classes': ('wide', ),
        'fields': ('email', 'password')
    }), )
    search_fields = ('email', )
    ordering = ('email', )
    filter_horizontal = ()


admin.site.register(User, UserAdmin)