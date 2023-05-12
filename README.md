# Meter Readings

For this exercise, we would like you to create an app to collect customer's meter readings.

Customers read the numbers from their electricity meter, and send them to us so we can properly bill them for their electricity and gas usage.

We need this app to do the following:

## Adding new readings

We want to allow users to add new meter readings using the input box. New readings should be validated against the following rules:
a. They must be a 5 digit number between 00000 and 99999.
b. A new reading must be higher than the last _customer_ reading.

When a customer enters an invalid meter, we should apply the `error` class to the input field, and show an error message.

## Estimated usage

We want to estimate the customer's upcoming usage and show it on the page. We estimate usage by taking the last four meter readings, taking the average distance between them, and adding that to the latest reading.

For example, if the customers' readings were (in descending order):

00400
00350
00250
00100

The average distance between each of these is:

00400 - 00350 = 50
00350 - 00250 = 100
00250 - 00100 = 150

(150 + 100 + 50) / 3 = 100

Estimated usage = 00400 + 100 = 00500
