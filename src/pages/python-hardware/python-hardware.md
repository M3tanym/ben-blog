# Python: How to write smart hardware wrappers
## And why context managers are your friends

_Mar 26, 2021_

In the [2020 StackOverflow Annual Developer Survey](https://insights.stackoverflow.com/survey/2020#technology-most-loved-dreaded-and-wanted-languages-wanted), 
Python was the #1 most wanted programming language. 
It's easy to see why: Python is easy to learn, easier to read, and it allows programmers to articulate complex 
instructions with very simple syntax. 
Python is used all over the place: web development, machine learning, data science, even on embedded systems. 
(Check out [MicroPython](http://micropython.org/!) Python can also be used to interact with hardware devices. 
With the increasing popularity of single-board computers with IO pins exposed (like the Raspberry Pi), 
low-level development has never been more accessible to entry-level coders.

Hardware programming poses some interesting challenges that programmers used to high-level development may 
not be familiar with. 
High-level environments provide many benefits like garbage collection, safe memory management, 
and even asynchronous computing APIs. 
These features are fantastic because they allow the programmer to focus on the details of their project
without getting sidetracked on low-level quirks.
Unfortunately, interacting with hardware isn't always so easy. 
Often you may be dealing with a hardware device through an OS-level interface like a driver or a socket. 
These structures are considered to be "stateful": they retain information about the current connection 
and previous transaction. 
This means that it may be possible to end up in a bad state where the device is happy or not responding. 
If you've ever had to unplug and re-plug a device to make it work, or turn something on and off repeatedly, 
you know what I'm talking about. 
This is usually a sign that the software messed up and the only path to recovery is a fresh start.

<img alt="hardware" src="hardware.webp" width="100%;"/>

Photo by [Louis Reed](https://unsplash.com/@_louisreed?utm_source=medium&utm_medium=referral) on 
[Unsplash](https://unsplash.com/?utm_source=medium&utm_medium=referral)

Luckily, many popular hardware components come with Python libraries that you can import and never worry 
about the low-level interactions. But if you work with hardware long enough, you will inevitably 
find a sensor without an accompanying library and be forced to implement the "driver code" yourself. 
This is when the design challenges begin to crop up. How do you provide a convenient interface to the 
hardware while also tackling the nitty-gritty details? Can you trust the user (the programmer using your library) 
to make the right calls in the right order? Will they close the device? Send bad data? There are many considerations, 
and in Python, some of these concerns are more easily dealt with than others.

Let's consider one of these problems in particular: maintaining state. 
How do we write a wrapper to guarantee our device is connected and disconnected correctly every time it's used? 
The Python language provides a nice solution to this problem: context mangers.

A context manager is simply a mechanism to help you manage a resource. 
The resource could be anything: a file, a system device or handle, a socket, or even allocated memory. 
Resources can be tricky to manage because they might be difficult to share (among threads and processes), 
and sensitive to state and scope (needs to be opened and closed every time). 
Context managers are intended as a solution to all these problems. 
To use a context-managed object in Python, all you need is the `with` keyword. For example:

```python
with open('flavors.txt') as f:
    flavors = f.read()
print('done!')
```

When the interpreter enters the `with` statement, it initializes the file resource. 
After the statement is exited (when we move out of the indented block), 
the variable `f` goes out of scope and Python releases the resource and closes it safely. 
The programmer doesn't have to worry about anyone else using the file or any of the bad consequences 
that can arise if `.close()` is not explicitly called. Pretty sweet!

To make our own class that supports context managers, Python provides two built-in method signatures to implement: 
`__enter__()` and `__exit__()`. 
We'll still use the standard `__init__()` (constructor) method as well. 
As you can probably infer, `__enter__()` gets called when we enter a `with` statement, 
and `__exit__()` gets called when we leave. Python won't force anyone to use a context manager: 
you can still call `open()` without using `with`. But it's nice to provide the functionality anyway.

Let's consider an example: we want to make a class for interacting with a hardware component, and we'd like it to be
context-managed. The hardware device could be something like a USB Thermometer to which we open a serial connection:

```python
class Sensor:
    def __init__(self):
        print('Opening device...')
        self._device = serial.Serial('COM3', 9600, timeout=1)
def __enter__(self):
        print('Using context manager!')
        return self
def __exit__(self, exc_type, exc_val, exc_tb):
        print('Automatically closing device!')
        self.close()
def close(self):
        print('Closing device...')
        self._device.close()
def measure(self):
        print('Measuring...')
        return self._device.read()
```

Using the sensor in program:

```python
if __name__ == '__main__':
    with Sensor() as s:
        data = s.measure()
        print(f'Temperature: {data} degrees F')
```

produces:

```
Opening device...
Using context manager!
Measuring...
Temperature: 42 degrees F
Automatically closing device!
Closing device...
```

The enter method simply returns a reference to the object, since the constructor needs to 
be called whether or not we are using context management. 
The exit method calls the close method (which we also expose, in case whoever uses this library doesn't 
want to use a context manager). 
The additional arguments to the exit method provide extra details about the nature of the exit,
but for our purposes they can be ignored.

This is a simple example, but it demonstrates how powerful Python's context managers can be. 
Even if there is an error, our device will always be closed and the resources freed, 
which means it will still work next time we try to use it.

For further reading, check out the Python documentation on [context managers](https://docs.python.org/3/library/contextlib.html). 
This demo just scratches the surface: you can explore how to use decorators, generators, 
and even asynchronous context-managed resources. Good luck!

`Python` `Hardware` `Software Development` `Design`
