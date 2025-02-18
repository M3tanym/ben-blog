# big heading

### little heading

_italic_ *text*

__bold__ **text**

~strikethrough~ text

emoji and special characters:  🏙️🏕🛫🥏🚲 &euro;&copy; :pizza:

blockquote text:
> "This is the real secret of life — to be completely engaged with what you are doing
> in the here and now. And instead of calling it work, realize it is play."
> 
> ― Alan Watts

lists and links:
- [standard link](https://blog.bengillett.com)
- quick link: https://bengillett.com
1. [x] this one has a checkbox
2. [ ] add something here

math inline: $y = \tan\left(\frac{\theta}{\pi}\right)$

math block:
```math
\vec{\nabla} \times \vec{F} = \left(\frac{\partial F_z}{\partial y} - \frac{\partial F_y}{\partial 
z}\right) \hat{i} + \left(\frac{\partial F_x}{\partial z} - \frac{\partial F_z}{\partial x}\right) 
\hat{j} + \left(\frac{\partial F_y}{\partial x} - \frac{\partial F_x}{\partial y}\right) \hat{k}
```

code inline: `hello-world`

code block:
```
{
    "markdown": 100.0,
    "code": true
}
```

code block with syntax highlighting:
```python
def socket_send(self, message: str) -> str:
    return self._send(message)
```

divider:

---------

table:

|        City | Average Annual Precipitation |
|------------:|:-----------------------------|
|     Seattle | 39.3 in                      |
|   San Diego | 10.2 in                      |
|      Denver | 15.6 in                      |
|      Dallas | 37.1 in                      |
| Minneapolis | 30.4 in                      |
|      Boston | 47.1 in                      |

html:
<span style="font-family: cursive;"> fancy font</span>

images:

![mountains](mountains.svg "^height=100px")
<img alt="train" src="train.svg" height="100px"/>
<img alt="city" src="https://www.svgrepo.com/show/286065/city-river.svg" width="100px"/>
