/* Based on Alex Arnell's inheritance implementation. */

/**
 * == lang ==
 * Language extensions.
**/

/**
 *  == ajax ==
 *  Dead-simple Ajax.
**/

/**
 *  == DOM ==
 *  DOM extensions.
**/
 
 /**
   *  Function#argumentNames() -> Array
   *  Reads the argument names as stated in the function definition and returns
   *  the values as an array of strings (or an empty array if the function is
   *  defined without parameters).
  **/

/** section: lang
 * Class
**/

  /**
   *  Class.create([superclass][, methods...]) -> Class
   *  - superclass (Class): The optional superclass to inherit methods from.
   *  - methods (Object): An object whose properties will be "mixed-in" to the
   *      new class. Any number of mixins can be added; later mixins take
   *      precedence.
   *
   *  Creates a class.
   *
   *  Class.create returns a function that, when called, will fire its own
   *  `initialize` method.
   *
   *  `Class.create` accepts two kinds of arguments. If the first argument is
   *  a `Class`, it's treated as the new class's superclass, and all its
   *  methods are inherited. Otherwise, any arguments passed are treated as
   *  objects, and their methods are copied over as instance methods of the new
   *  class. Later arguments take precedence over earlier arguments.
   *
   *  If a subclass overrides an instance method declared in a superclass, the
   *  subclass's method can still access the original method. To do so, declare
   *  the subclass's method as normal, but insert `$super` as the first
   *  argument. This makes `$super` available as a method for use within the
   *  function.
   *
   *  To extend a class after it has been defined, use [[Class#addMethods]].
  **/
