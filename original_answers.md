# ERIC OLIVEIRA
# Fullstack Engineering Quiz
**Started:** Jan 23, 2017 - 11:31

**Finished:** Jan 23, 2017 - 13:17

I could not finish the whole quiz in 1.5 hours. I did, however, take advantage of the reqs detailed below and wrote a full stack app based on it, complete with seed data.
You can read more about it here:
[https://github.com/clapinton/Acme-Finghi-Trading-Company/blob/master/acme-finghi-app.md](https://github.com/clapinton/Acme-Finghi-Trading-Company/blob/master/acme-finghi-app.md)


I approached the quiz in the following order:
Q1 -> Q3 -> Q4 -> Q2

The reson for that is I did not remember the syntax for writing Ruby specs (needed for Q2), so I'd have to go through the documentation first. Therefore, I left it for last.
I did take a bit more than 1.5 hours so I could come back to the JS part and wrap some loose ends I had left.


# Answers

Ebates asks all candidates to complete a simple quiz. It shouldn’t take more than 1.5 hours to
complete. You can complete this quiz at home or wherever you’d like using whatever resources
that you want. Obviously, the exception is that we want you to take the quiz, not someone else.

Please spend no more than 1 .5 hours to complete the quiz. At the top of your response, please
write your name, and the date and time you started and stopped the quiz. Please include your
answers below each corresponding question using Courier New as the font.

-- BEGIN QUIZ --

## Overview:

Pretend, you work at a company called Acme Finghi Trading Company. You specialize in selling rare
food from the funghi kingdom. Customers can come to Acme’s e-commerce site and buy products
that are shipped to their destination of choice.

As part of Acme’s engineering team, you’re working on getting the new e-commerce site up and
running. You are given a story by the product manager that says the following:

**“As a customer, I should be able to search by species and/or country of origin for all types of
mushrooms and funghi.”**

Someone has already built most of the database tables and include the following tables:

* species - Defines the different types of species of mushrooms.
* country - Defines the list of countries where the mushrooms might come from
* species_inventory - Defines the species, its country of origin, and the number remaining in
inventory.

The table structure looks like this:

### SPECIES
|Column|Constraints|Description|
|-|-|-|
|species_id | INT, PK | Primary key |
|species_latin_name | VARCHAR, UNIQUE | Latin name of the species such as “Anamita Muscaria”. |
|species_name| VARCHAR, NOT NULL | Name of the species using a friendly name. For example, Agaricus bisporus, is called the “White Button Mushroom”.|

### COUNTRY
|Column|Constraints|Description|
|-|-|-|
|country_id | INT, PK | Primary key |
|country_name | VARCHAR, NOT NULL | Name of country (e.g. United States, Japan, Italy) |
|country_code2 | CHAR(2) | Two character country code (e.g. US, JP, IT) |

### SPECIES_INVENTORY
|Column|Constraints|Description|
|-|-|-|
|species_inventory_id | INT, PK | Primary key |
|species_id | INT, FK species(species_id), NOT NULL| FK to species table.
|country_id | INT, FK country(country_id), NOT NULL | Country of origin of this mushroom.
|inventory_count | INT, NOT NULL | Number of these you have left.
|next_shipment_date | Date | The date of the next shipment.
|price | Money, Not null |

## Question 1 - API
The Acme web app is heavily built on JavaScript and simply calls a Species microservice for its data.
Using whatever language and/or framework you want, write a function or method that accepts one
or more species and an optional country of origin HTTP request parameter and returns a json blob
of matching Species objects. Make the assumption that there is already a function you can call to
perform the search. The function signature to perform the search is as follows is listed below.

`def Species[] searchSpecies(species[], countryCode2 = null) ;`

```ruby
# The code below is written in Ruby, using the Rails framework
# Assuming the input is a GET request where the search params are embedded in the URL, in the form of:
# https://www.acmefinghi.com/search?species=species_1_latin_name,species_2_latin_name,species_3_latin_name,species_4_latin_name&country=JP
# 1. Parse the URL to extract the species name and country code;
# 2. Pass the parsed info to the searchSpecies method;
# 3. Render the JSON blob

# Species Controller
def index
  species_query = params["species"].split(",") #Returns an array of species latin names
  country_query = params["country"] #If country is not present, it will return null

  @matched_species = searchSpecies(species_query, country_query) #Will be passed to the search View for rendering
end
```
```js
//search.json.jbuilder
//Displaying species ID, Latin Name, Name, Country Name and Next Shipment Date
@matched_species.each do |species|
  json.set! species.id do
    json.latin_name species.species_latin_name
    json.name species.species_name
    json.country_name species.country_name
    json.next_shipment_date species.next_shipment_date
    json.inventory_count species.inventory_count
  end
end
```

## Question 2 - Test Cases
Using whatever language you want, write test cases to test the function you wrote in Question 1.

## Question 3- JavaScript
The function you wrote in question 1 is exposed through the path “/search” . Using whatever
JavaScript framework you want, write JavaScript that calls the /search route and binds the result to
an HTML element that contains the following fields: Species Name, Latin Name, Country of Origin
Name, and Next Shipment Date. Only show next shipment date if the inventory is 0 and the next
shipment date is in the future. Use whatever CSS you feel.

```HTML
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Species Search Result</title>
		<script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
  </head>
  
  <body>

    <h1>jQuery</h1>
    <main>
      <div class="species-table-wrapper">
        <table class="species-list-table">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Latin Name</th>
            <th>Country of Origin</th>
            <th>Next Shipment Date</th>
          </tr>
        </table>
      </div>
    </main>

    <script>

    //The following code uses ES5 and the jQuery library for quick implementation. React + Redux could also be a possibility.
    //Re the shipment date constraint, I would prefer to add the logic to the back end (SQL), avoiding front end logic.
    //But, since I don't know if the data will be used in other sections of the screen, I'll develop the logic here instead of Q4's SQL.

    function displayResults(res) {

      //Helper for checking if should display shipment date. Returns the date or "-", ready to be printed.
      function displayedShipmentDate(inventory, shipmentDate) {
        var dateNow = new Date(); //This is today in milliseconds since Jan 1, 1970 
        var dateOfNextShipment = Date.parse(shipmentDate); //Milliseconds between date and Jan 1, 1970

        // Only displays the next shipment if the date is in the future and the inventory is 0.
        if (inventory === 0 && dateOfNextShipment > dateNow) {
          return shipmentDate;
        } else {
          return "-";
        }
      }

      $(".species-item").remove(); //Remove previous results
      Object.keys(res).map( function(inventoryId) { //Map through each species, with inventoryId being the object keys
        var speciesItem = res[inventoryId];
        var speciesId = speciesItem.id;
        var speciesName = speciesItem.name;
        var speciesLatinName = speciesItem.name;
        var originCountry = speciesItem.country_name;
        
        //Check if next shipment date should be displayed
        var inventoryCount = speciesItem.inventory_count;
        var nextShipment = speciesItem.next_shipment_date;
        var shipmentDate = displayedShipmentDate(inventoryCount, nextShipment);

        //For each species, crete a new speciesLine and concat <td> to it. Lastly, append the var to the table.
        //On ES6, would've used string interpolation.
        var speciesLine = "<tr class='species-item'>";
        speciesLine += '<td class="speciesInfo">' + speciesId + '</td>';
        speciesLine += '<td class="speciesInfo">' + speciesName + '</td>';
        speciesLine += '<td class="speciesInfo">' + speciesLatinName + '</td>';
        speciesLine += '<td class="speciesInfo">' + originCountry + '</td>';
        speciesLine += '<td class="speciesInfo">' + shipmentDate + '</td>';
        speciesLine += '</tr>';

        $(".species-list-table").append(speciesLine);

      })
    }

    function querySpecies(speciesIds, countryCode) {
      var queryUrl = "api/search?species=" + speciesIds.join(",") + "&country=" + countryCode;

      $.ajax({
        method: "GET",
        url: queryUrl,
        success: displayResults,
        error: function(res) {alert("An error has occurred: " + res.status + " - " + res.statusText)}
      });
    }

    </script>
  </body>

</html>
```

## Question 4 - SQL
Query 1 - Write a query that returns the necessary fields to satisfy the requirements in Question 3.

```ruby
  # The language used here is ruby with the heredocs syntax, allowing me to pass in query parameters for the WHERE filters.
  # The query will return all species, including those without any entries on the inventory table.
  # I would add the shipment date contraint from Q3 here, avoiding logic on the front end side,
  # but I don't know if the data would be used in other parts of the interface.
  Species.find_by_sql ["SELECT s.id, s.species_name, s.species_latin_name, c.country_name, i.id inventory_id , i.next_shipment_date, i.inventory_count
    FROM species s
    LEFT OUTER JOIN species_inventories i ON s.id = i.species_id
    LEFT OUTER JOIN countries c ON c.id = i.country_id
    WHERE s.id IN (?) AND c.country_code2 = ?;", species_query, country_query]
```

Query 2 - Your purchase manager comes to you and says “I really need a report that tells me how
many of each species I have left total in inventory plus the number of remaining in inventory from
each country.” Show the sql using the following columns:

* Species ID
* Species Name
* Species Latin Name
* Total Remaining in Inventory
* <Country 1> Inventory
* <Country 2> Inventory
* <Country 3> Inventory

And so on.

If it helps, assume you only have 3 countries: 1 = Italy, 2 = United States, 3 = Japan.

```sql

  -- Pre-fetching remaining total inventory per species and saving them to memory for quicker access.
  -- The temp table will be deleted when the session is terminated.
  -- The following returns:
  -- | Species ID | Total Inventory |
  SELECT s.species_id, SUM(i.inventory_count)
  INTO #temp_species_inventory
  FROM species s
  LEFT OUTER JOIN species_inventory i ON s.species_id = i.species_id;
  GROUP BY s.species_id;

  -- Main query returns:
  -- Species ID | Species Name | Species Latin Name | Total Inventory | Country 1 Inventory | Country 2 Inventory ...
  -- Can not test it on example project since it's using sqlite3, which does not support PIVOT.
  SELECT s.species_id, s.species_name, s.species_latin_name, ti.inventory_count, [1] AS Italy, [2] AS US, [3] AS Japan
  FROM species s
  LEFT OUTER JOIN temp_species_inventory ti ON s.species_id = ti.species_id
  LEFT OUTER JOIN species_inventory i ON s.species_id = i.species_id
  PIVOT (
    SUM(i.inventory)
    FOR i.country_id IN ([1],[2],[3])
  );

  -- In order to include all countries, dynamic SQL is necessary. I could not get such approach to work in the allotted time.
```