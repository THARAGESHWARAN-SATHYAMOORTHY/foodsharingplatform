from django.db import models

class User(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.name

class FoodItem(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    nutritional_info = models.TextField()
    allergy_alerts = models.TextField()

    def __str__(self):
        return self.name

class Donation(models.Model):
    donor = models.ForeignKey(User, on_delete=models.CASCADE)
    food_item = models.ForeignKey(FoodItem, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    pickup_address = models.TextField()
    delivery_address = models.TextField()
    is_completed = models.BooleanField(default=False)

    def __str__(self):
        return f"Donation by {self.donor} - {self.food_item}"
