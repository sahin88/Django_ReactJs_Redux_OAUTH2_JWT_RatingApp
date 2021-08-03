from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager,PermissionsMixin
import datetime


class UserAccountManager(BaseUserManager):
    def create_user(self, email, password=None, is_active=True, is_admin=False, is_superuser=False, is_staff=False,**extra_fields):
        if email is None:
            raise ValueError('User must have an email')
 
        user = self.model(email=self.normalize_email(email),**extra_fields)
        user.set_password(password)
        user.is_admin = is_admin
        user.is_superuser = is_superuser
        user.is_active = is_active
        user.is_staff = is_staff
        user.save(self._db)
        return user

    def create_superuser(self, email, password,**extra_fields):
        user = self.create_user(
            email=email,  password=password, is_active=True, is_admin=True, is_superuser=True, is_staff=True,**extra_fields)

        return user


class UserAccount(AbstractBaseUser,PermissionsMixin):
    id = models.AutoField(primary_key=True)
    email = models.EmailField(max_length=60, verbose_name='email', unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255, blank=True)
    data_joined = models.DateTimeField(
        verbose_name='date_joined', default=datetime.datetime.now)
    last_login = models.DateTimeField(
        verbose_name='last_login', default=datetime.datetime.now)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = [ 'first_name','last_name']
    objects = UserAccountManager()

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True
