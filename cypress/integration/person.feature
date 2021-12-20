Feature: Person form

    Background: Open site
        Given I'm on the initial page
            And I filled all fields on form account
            And go to the next form

    Scenario Outline: Without value on input <field>
        When I not filled the <field>
        Then should show the required message on <index>
        Examples:
        |  field       | index |
        | first-name   | 1     |
        | last-name    | 2     |
        | birth-date   | 4     |

    Scenario Outline: Invalid value on input <field>
        When I filled the <field> with a invalid <value>
        Then should show the <index> error <message>
        Examples:
        |  field       | value      | index | message         |
        | first-name   | a          | 1     | error-minlength |
        | last-name    | a          | 2     | error-minlength |
        | birth-date   | aa         | 4     | error-ngbDate   |
        | birth-date   | 2011-12-08 | 4     | error-isMinor   |

    Scenario Outline: Valid value on input <field>
        When I filled the <field> with a valid <value>
        Then should not show the <index> error mesage
        Examples:
        |  field        | value      | index |
        | first-name    | FirstName  | 1     |
        | last-name     | LastName   | 2     |
        | birth-date    | 1990-12-08 | 4     |

    Scenario Outline: More than 20 characters on input <field>
        When I filled the <field> with <value>
        Then should show the message 'error-maxlength' on <index>
        Examples:
        |  field       | value                          | index |
        | first-name   | Firstnamemorethan20characters  | 1     |
        | last-name    | Lastnamemorethan20characters   | 2     |

    Scenario Outline: <type> value on select <field>
        When I put a <value> on <field>
        Then should <show> the message on select <index>
        Examples:
        |  type   | field  | value  | show     | index |
        | valid   | gender | F      | not show | 3     |
        | invalid | gender | Select | show     | 3     |

    Scenario Outline: Button next <prop>
        When I filled <fields> fields on form person
        Then the next button should be <prop>
            And the button on index <index> should be <prop>
        Examples:
        |  prop   | fields    | index  |
        | disable | only some | 2      |
        | enable  | all       | 2      |

    Scenario Outline: Button Previous
            And the previous button should be enable
        When I go back to the previous form
            And I <action> field
        Then the next button should be <prop>
        Examples:
        |  action        | prop    |
        | clear some     | disable |
        | dont clear any | enable  |
