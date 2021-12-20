Feature: Address form

    Background: Open site
        Given I'm on the initial page
            And I filled all fields on form account
            And go to the next form
            And I filled all fields on form person
            And go to the next form
    
    Scenario Outline: Without value on <field>
        When I not filled the <field>
        Then should show the required message on <index> in the address form
        Examples:
        |  field    | index |
        | address   | 2     |
        | zipcode   | 3     |

    Scenario: Filled all fields
        When I filled all fields on form address
        Then the register button should be enable
    
    Scenario: Changed the country
        When I filled all fields on form address
            And I changed the country
        Then should show the required message on 2 in the address form 
     
     