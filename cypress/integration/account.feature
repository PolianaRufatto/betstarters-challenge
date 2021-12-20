Feature: Account form

    Background: Open site
        Given I'm on the initial page

    Scenario Outline: Without value on input <field>
        When I not filled the <field>
        Then should show the required message on <index>
        Examples:
        |  field           | index |
        | email            | 1     |
        | username         | 2     |
        | password         | 3     |
        | repeat-password  | 4     |

    Scenario Outline: Invalid value on input <field>
        When I filled the <field> with a invalid <value>
        Then should show the <index> error <message>
        Examples:
        |  field           | value    | message            | index |
        | email            | test@t.t | error-email-format | 1     |
        | username         | aaa      | error-minlength    | 2     |
        | password         | aaaaa    | error-minlength    | 3     |
        | repeat-password  | aaaaa    | error-minlength    | 4     |

    Scenario Outline: Valid value on input <field>
        When I filled the <field> with a valid <value>
        Then should not show the <index> error mesage
        Examples:
        |  field           | value          | index |
        | email            | test@test.test | 1     |
        | username         | username       | 2     |
        | password         | password       | 3     |

    Scenario Outline: More than 20 characters on input <field>
        When I filled the <field> with <value>
        Then should show the message 'error-maxlength' on <index>
        Examples:
        |  field          | value                        | index |
        | username        | usernamemorethan20characters | 2     |
        | password        | passwordmorethan20characters | 3     |
        | repeat-password | passwordmorethan20characters | 4     |

    Scenario Outline: <type> value on select <field>
        When I put a <value> on currency
        Then should <show> the message on select <index>
        Examples:
        |  type   | field    | value  | show     | index |
        | valid   | currency | euro   | not show | 5     |
        | invalid | currency | Select | show     | 5     |

    Scenario Outline: <type> repeat password
        When I filled the password with <value>
            And I set a <value2> password on the field repeat password
        Then should <show> the message 'error-validateEqual'
        Examples:
        |  type   | value           | value2       | show     |
        | Valid   | passwordTest    | passwordTest | not show |
        | Invalid | passwordTestInv | passwordTes  | show     |

    Scenario Outline: Button next <prop>
        When I filled <fields> fields on form account
        Then the next button should be <prop>
            And the button on index <index> should be <prop>
        Examples:
        |  prop   | fields    | index |
        | disable | only some | 1     |
        | enable  | all       | 1     |
