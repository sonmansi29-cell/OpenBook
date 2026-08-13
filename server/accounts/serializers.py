from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from .models import Address, Profile, User


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ("id", "label", "recipient_name", "phone", "line1", "line2", "city", "state", "postal_code", "country", "is_default")
        read_only_fields = ("id",)


class ProfileSerializer(serializers.ModelSerializer):
    addresses = AddressSerializer(many=True, read_only=True)

    class Meta:
        model = Profile
        fields = ("phone", "avatar", "addresses")
        read_only_fields = ("addresses",)


class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(read_only=True)

    class Meta:
        model = User
        fields = ("id", "username", "email", "first_name", "last_name", "profile")
        read_only_fields = ("id", "email", "profile")


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, validators=[validate_password])

    class Meta:
        model = User
        fields = ("username", "email", "password", "first_name", "last_name")

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class ProfileUpdateSerializer(serializers.ModelSerializer):
    phone = serializers.CharField(source="profile.phone", required=False, allow_blank=True)
    avatar = serializers.URLField(source="profile.avatar", required=False, allow_blank=True)

    class Meta:
        model = User
        fields = ("username", "first_name", "last_name", "phone", "avatar")

    def update(self, instance, validated_data):
        profile_data = validated_data.pop("profile", {})
        for field, value in validated_data.items():
            setattr(instance, field, value)
        instance.save()
        profile, _ = Profile.objects.get_or_create(user=instance)
        for field, value in profile_data.items():
            setattr(profile, field, value)
        profile.save()
        return instance
