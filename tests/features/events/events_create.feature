Feature: Create events

  As a user
  I want to create a new event
  So I can add information

  Background:
    Given I am on the home page

  Scenario: Anonymous users should see the option to add an event but be directed to a login page with a message
    And I hover over ".add"
    When I click on ".add-event"
    Then the "h1" element should contain "Sign in"
    And the ".wrapper-message" element should contain "Sign in or register to participate in the World Theatre Map"

  Scenario: Users should see all the fields on the add event form
    And I am logged in
    And I hover over ".add"
    When I click on ".add-event"
    Then I should see the ".event-show-name-edit" element
    And I should see the ".event-about-edit" element

  Scenario: Users should be able to create an event with all the fields
    And a profile with the following fields:
      | name | My Favorite Playwright |
    And I am logged in
    And I go to the "show" add page
    And I fill in ".show-name-edit" with "Sofia"
    And I fill in ".show-author-name-edit" with "My Favorite Playwright"
    And I click on ".autocomplete-results li"
    And I fill in ".show-about-edit" with "Most popular name in Italy"
    And I click on ".edit-show-save"
    When I go to the "event" add page
    And I fill in ".event-show-name-edit" with "Sofia"
    And I click on ".autocomplete-results li"
    And I select "Performance" from ".event-type-edit"
    And I fill in ".event-about-edit" with "A workshop on spelling"
    And I click on ".edit-event-save"
    Then the "h1.page-title" element should contain "Sofia"
    And the ".event-about" element should contain "A workshop on spelling"

  Scenario: Events should display the primary author for the related show
    And a profile with the following fields:
      | name | My Favorite Playwright |
    And I am logged in
    And I go to the "show" add page
    And I fill in ".show-name-edit" with "Sofia"
    And I fill in ".show-author-name-edit" with "My Favorite Playwright"
    And I click on ".autocomplete-results li"
    And I fill in ".show-about-edit" with "Most popular name in Italy"
    And I click on ".edit-show-save"
    And I hover over ".add"
    When I click on ".add-event"
    And I fill in ".event-show-name-edit" with "Sofia"
    And I click on ".autocomplete-results li"
    And I select "Performance" from ".event-type-edit"
    And I fill in ".event-about-edit" with "A workshop on spelling"
    And I click on ".edit-event-save"
    Then the ".event-name" element should contain "Sofia"
    Then the ".event-type" element should contain "Performance"
    And the ".event-authorship" element should contain "My Favorite Playwright"

  Scenario: Event type should be required and give an error if not selected
    And a profile with the following fields:
      | name | My Favorite Playwright |
    And I am logged in
    And I go to the "show" add page
    And I fill in ".show-name-edit" with "Sofia"
    And I fill in ".show-author-name-edit" with "My Favorite Playwright"
    And I click on ".autocomplete-results li"
    And I fill in ".show-about-edit" with "Most popular name in Italy"
    And I click on ".edit-show-save"
    And I hover over ".add"
    When I click on ".add-event"
    And I fill in ".event-show-name-edit" with "Sofia"
    And I click on ".autocomplete-results li"
    And I fill in ".event-about-edit" with "A workshop on spelling"
    And I click on ".edit-event-save"
    Then the ".error-block" element should contain "Event type is required"
