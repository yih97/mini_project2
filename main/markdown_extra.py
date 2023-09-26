from django import templates
from django.utils.safestring import mark_safe
import markdown as md

register = templates.Library()

@register.filter
def markdown(value):
    return mark_safe(md.markdown(value))